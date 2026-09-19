'use client'

import { useCallback, useRef, useState } from 'react'
import clsx from 'clsx'
import Script from 'next/script'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import type { FormFieldItem } from '@/types/form'
import {
  CANCELLATION_FORM_SECTIONS,
  CANCELLATION_FORM_ALL_FIELDS,
  CANCELLATION_FORM_COMPLETE,
} from '@/constants/product/resident/cancellation/form'
import { VALIDATION_TEXT } from '@/constants/validationText'
import { RECAPTCHA_SITE_KEY } from '@/constants/recaptcha'
import { BASE_PATH } from '@/constants/common/basePath'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Confirm from './Confirm'
import { resolveConfirmValue } from './resolveConfirmValue'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SELECT_TYPE_INPUT_TYPES = ['radio', 'select', 'checkboxGroup', 'checkbox']

function validateField(value: string, field: FormFieldItem): string {
  if (field.type === 'required' && !value.trim()) {
    return SELECT_TYPE_INPUT_TYPES.includes(field.inputType ?? 'text')
      ? VALIDATION_TEXT.requiredSelect
      : VALIDATION_TEXT.required
  }
  if (field.email && value.trim() && !EMAIL_REGEX.test(value)) {
    return VALIDATION_TEXT.email
  }
  return ''
}

export default function CancellationFormSections() {
  const [mode, setMode] = useState<'input' | 'confirm' | 'complete'>('input')
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    CANCELLATION_FORM_ALL_FIELDS.forEach((field) => {
      initial[field.name] = ''
    })
    return initial
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  // honeypot
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const handleChange = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [])

  const handleConfirm = useCallback(() => {
    const newErrors: Record<string, string> = {}
    let firstErrorSectionIndex: number | null = null
    CANCELLATION_FORM_SECTIONS.forEach((section, index) => {
      section.fields.forEach((field) => {
        const error = validateField(values[field.name], field)
        if (error) {
          newErrors[field.name] = error
          if (firstErrorSectionIndex === null) firstErrorSectionIndex = index
        }
      })
    })
    setErrors(newErrors)
    if (firstErrorSectionIndex !== null) {
      sectionRefs.current[firstErrorSectionIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setMode('confirm')
  }, [values])

  const handleBack = useCallback(() => {
    setMode('input')
  }, [])

  const handleSubmit = useCallback(async () => {
    if (honeypot) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const token = await new Promise<string>((resolve) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: 'cancellation_form_submit' })
            .then(resolve)
        })
      })

      // メール本文が読みやすくなるよう、コード値ではなくラベル文言に解決してから送信する
      const payload: Record<string, string> = {}
      CANCELLATION_FORM_ALL_FIELDS.forEach((field) => {
        payload[field.name] = resolveConfirmValue(field, values[field.name])
      })

      const response = await fetch(`${BASE_PATH}/contact/send-cancellation.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, recaptchaToken: token }),
      })
      const result = await response.json()

      if (!result.success) {
        setSubmitError(result.message || '送信に失敗しました。時間をおいて再度お試しください。')
        return
      }
      setMode('complete')
    } catch {
      setSubmitError('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }, [honeypot, values])

  if (mode === 'complete') {
    return (
      <section className={clsx('section-contents-wrapper', productStyles.section)}>
        <div className="section-contents-inner">
          <BaseTitle
            navId="product-resident-cancellation-form"
            used="product"
            type="white"
            subTitle={CANCELLATION_FORM_COMPLETE.subTitle}
          />
          <div className="section-contents">
            <ScrollableSectionInner>
              <div className={productStyles.sectionItem}>
                <p className={styles.completeMessage}>
                  <span className={styles.completeMessageTitle}>{CANCELLATION_FORM_COMPLETE.title}</span>
                  <br />
                  <span className={styles.completeMessageBody}>{CANCELLATION_FORM_COMPLETE.body}</span>
                </p>
              </div>
            </ScrollableSectionInner>
          </div>
        </div>
      </section>
    )
  }

  if (mode === 'confirm') {
    return (
      <Confirm
        values={values}
        submitError={submitError}
        isSubmitting={isSubmitting}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    )
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <input
        className={styles.honeypot}
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
      <Step1
        sectionRef={(el) => {
          sectionRefs.current[0] = el
        }}
        values={values}
        errors={errors}
        onChange={handleChange}
      />
      <Step2
        sectionRef={(el) => {
          sectionRefs.current[1] = el
        }}
        values={values}
        errors={errors}
        onChange={handleChange}
      />
      <Step3
        sectionRef={(el) => {
          sectionRefs.current[2] = el
        }}
        values={values}
        errors={errors}
        onChange={handleChange}
      />
      <Step4
        sectionRef={(el) => {
          sectionRefs.current[3] = el
        }}
        values={values}
        errors={errors}
        onChange={handleChange}
      />
      <Step5
        sectionRef={(el) => {
          sectionRefs.current[4] = el
        }}
        values={values}
        errors={errors}
        onChange={handleChange}
        agreed={agreed}
        onAgreedChange={setAgreed}
        onConfirm={handleConfirm}
      />
    </>
  )
}
