'use client'

import { useState, useCallback } from 'react'
import clsx from 'clsx'
import Script from 'next/script'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import FormLabel from '@/components/Shared/Form/FormLabel'
import FormInput from '@/components/Shared/Form/FormInput'
import FormTextarea from '@/components/Shared/Form/FormTextarea'
import FormCheckbox from '@/components/Shared/Form/FormCheckbox'
import type { FormFieldItem } from '@/types/form'
import { CONTACT_FORM_FIELDS, CONTACT_FORM_COMPLETE } from '@/constants/sections/contact/form'
import { VALIDATION_TEXT } from '@/constants/validationText'
import { RECAPTCHA_SITE_KEY, RECAPTCHA_DISCLOSURE_TEXT } from '@/constants/recaptcha'
import { BASE_PATH } from '@/constants/common/basePath'
import styles from './style.module.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// PCでは何番目までを左列にするか（残りのうちtextareaは常に全幅側に出す）
const splitNum = 3

function validateField(value: string, field: FormFieldItem): string {
  if (field.type === 'required' && !value.trim()) {
    return field.inputType === 'radio' ? VALIDATION_TEXT.requiredSelect : VALIDATION_TEXT.required
  }
  if (field.email && value.trim() && !EMAIL_REGEX.test(value)) {
    return VALIDATION_TEXT.email
  }
  return ''
}

export default function ContactFormSections() {
  const [mode, setMode] = useState<'input' | 'confirm' | 'complete'>('input')
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    CONTACT_FORM_FIELDS.forEach((field) => {
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

  const handleChange = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [])

  const handleConfirm = useCallback(() => {
    const newErrors: Record<string, string> = {}
    let hasError = false
    CONTACT_FORM_FIELDS.forEach((field) => {
      const error = validateField(values[field.name], field)
      if (error) {
        newErrors[field.name] = error
        hasError = true
      }
    })
    setErrors(newErrors)
    if (!hasError) setMode('confirm')
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
            .execute(RECAPTCHA_SITE_KEY, { action: 'contact_form_submit' })
            .then(resolve)
        })
      })

      const response = await fetch(`${BASE_PATH}/contact/send-contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, recaptchaToken: token }),
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

  const leftFields = CONTACT_FORM_FIELDS.slice(0, splitNum)
  const rightFields = CONTACT_FORM_FIELDS.slice(splitNum).filter(
    (field) => field.inputType !== 'textarea',
  )
  const fullFields = CONTACT_FORM_FIELDS.filter((field) => field.inputType === 'textarea')

  function renderField(field: FormFieldItem) {
    return (
      <div
        className={clsx(
          styles.formRow,
          field.inputType === 'textarea' && styles.formRowFull,
          mode === 'confirm' && styles.formRowConfirm,
        )}
        key={field.name}
      >
        <FormLabel
          label={field.label}
          type={field.type}
          htmlFor={field.name}
          used={field.name === 'content' ? 'contentLabel' : 'productForm'}
        />
        {mode === 'input' ? (
          field.inputType === 'textarea' ? (
            <FormTextarea
              name={field.name}
              value={values[field.name]}
              onChange={(v) => handleChange(field.name, v)}
              placeholder={field.placeholder}
              type={field.type}
              used="productForm"
              error={errors[field.name]}
            />
          ) : (
            <FormInput
              name={field.name}
              value={values[field.name]}
              onChange={(v) => handleChange(field.name, v)}
              placeholder={field.placeholder}
              email={field.email}
              type={field.type}
              used="productForm"
              error={errors[field.name]}
            />
          )
        ) : (
          <span className={styles.confirmValue}>{values[field.name]}</span>
        )}
      </div>
    )
  }

  return (
    <section className={clsx('section-contents-wrapper', styles.section)}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <div className="section-contents-inner">
        <BaseTitle navId="contact-form" used="product" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={styles.sectionItem}>
              {mode === 'complete' ? (
                <>
                  <p className={styles.completeMessage}>
                    <span className={styles.completeMessageTitle}>{CONTACT_FORM_COMPLETE.title}</span>
                    <br />
                    <span className={styles.completeMessageBody}>{CONTACT_FORM_COMPLETE.body}</span>
                  </p>
                  <BaseButton
                    text={CONTACT_FORM_COMPLETE.buttonText}
                    used="cancellationForm"
                    url="/"
                  />
                </>
              ) : (
                <div className={styles.formWrapper}>
                  <input
                    className={styles.honeypot}
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div className={styles.formColumns}>
                    <div className={styles.formColumn}>{leftFields.map(renderField)}</div>
                    <div className={styles.formColumn}>{rightFields.map(renderField)}</div>
                  </div>
                  {fullFields.map(renderField)}

                  {submitError && <p className={styles.submitError}>{submitError}</p>}

                  {mode === 'input' && <FormCheckbox checked={agreed} onChange={setAgreed} />}

                  <div className={styles.buttonArea}>
                    {mode === 'input' ? (
                      <BaseButton
                        text="確認する"
                        used="cancellationForm"
                        onClick={handleConfirm}
                        disabled={!agreed}
                      />
                    ) : (
                      <>
                        <BaseButton
                          text="戻る"
                          used="cancellationForm"
                          onClick={handleBack}
                          disabled={isSubmitting}
                        />
                        <BaseButton
                          text={isSubmitting ? '送信中...' : '送信する'}
                          used="cancellationForm"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        />
                      </>
                    )}
                  </div>
                  <p className={styles.recaptchaDisclosure}>{RECAPTCHA_DISCLOSURE_TEXT}</p>
                </div>
              )}
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
