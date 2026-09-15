'use client'

import { useState, useCallback } from 'react'
import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import FormLabel from '@/components/Shared/Form/FormLabel'
import FormInput from '@/components/Shared/Form/FormInput'
import FormTextarea from '@/components/Shared/Form/FormTextarea'
import FormRadio from '@/components/Shared/Form/FormRadio'
import type { FormFieldItem } from '@/types/form'
import { CANCELLATION_FORM_FIELDS } from '@/constants/product/cancellation-form'
import { VALIDATION_TEXT } from '@/constants/validationText'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// PCでは何番目までを左列にするか（残りのうちtextareaは常に全幅側に出す）
const splitNum = 5

function validateField(value: string, field: FormFieldItem): string {
  if (field.type === 'required' && !value.trim()) {
    return field.inputType === 'radio' ? VALIDATION_TEXT.requiredSelect : VALIDATION_TEXT.required
  }
  if (field.email && value.trim() && !EMAIL_REGEX.test(value)) {
    return VALIDATION_TEXT.email
  }
  return ''
}

function resolveConfirmValue(field: FormFieldItem, value: string) {
  if (field.inputType === 'radio') {
    return field.options?.find((option) => option.value === value)?.label ?? value
  }
  return value
}

export default function CancellationFormSections() {
  const [mode, setMode] = useState<'input' | 'confirm'>('input')
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    CANCELLATION_FORM_FIELDS.forEach((field) => {
      initial[field.name] = ''
    })
    return initial
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }, [])

  const handleConfirm = useCallback(() => {
    const newErrors: Record<string, string> = {}
    let hasError = false
    CANCELLATION_FORM_FIELDS.forEach((field) => {
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
    // TODO: PHP エンドポイント完成後に fetch で POST する（values を送信）
    // await fetch('/contact/send.php', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values),
    // })
  }, [])

  const leftFields = CANCELLATION_FORM_FIELDS.slice(0, splitNum)
  const rightFields = CANCELLATION_FORM_FIELDS.slice(splitNum).filter(
    (field) => field.inputType !== 'textarea',
  )
  const fullFields = CANCELLATION_FORM_FIELDS.filter((field) => field.inputType === 'textarea')

  function renderField(field: FormFieldItem) {
    return (
      <div
        className={clsx(styles.formRow, field.inputType === 'textarea' && styles.formRowFull)}
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
          ) : field.inputType === 'radio' ? (
            <FormRadio
              name={field.name}
              value={values[field.name]}
              onChange={(v) => handleChange(field.name, v)}
              options={field.options ?? []}
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
          <span className={styles.confirmValue}>{resolveConfirmValue(field, values[field.name])}</span>
        )}
      </div>
    )
  }

  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle
          navId="product-resident-cancellation-form"
          used="product"
          type="white"
        />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={productStyles.sectionItem}>
              <div className={styles.formWrapper}>
                <div className={styles.formColumns}>
                  <div className={styles.formColumn}>{leftFields.map(renderField)}</div>
                  <div className={styles.formColumn}>{rightFields.map(renderField)}</div>
                </div>
                {fullFields.map(renderField)}

                <div className={styles.buttonArea}>
                  {mode === 'input' ? (
                    <BaseButton text="確認する" used="cancellationForm" onClick={handleConfirm} />
                  ) : (
                    <>
                      <BaseButton text="戻る" used="cancellationForm" onClick={handleBack} />
                      <BaseButton
                        text="送信する"
                        used="cancellationForm"
                        onClick={handleSubmit}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
