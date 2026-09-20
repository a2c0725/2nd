import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import FormCheckbox, { FormCheckboxAgreementLink } from '@/components/Shared/Form/FormCheckbox'
import FormFieldRow, { splitFieldColumns } from './FormFieldRow'
import {
  CANCELLATION_FORM_ACCOUNT_FIELDS,
  CANCELLATION_FORM_RULE,
  CANCELLATION_FORM_SECTIONS,
} from '@/constants/product/resident/cancellation/form'
import { RECAPTCHA_DISCLOSURE_TEXT } from '@/constants/recaptcha'
import productStyles from '@/app/product/style.module.scss'

type Step5Props = {
  sectionRef: (el: HTMLElement | null) => void
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
  agreed: boolean
  onAgreedChange: (checked: boolean) => void
  onConfirm: () => void
}

export default function Step5({
  sectionRef,
  values,
  errors,
  onChange,
  agreed,
  onAgreedChange,
  onConfirm,
}: Step5Props) {
  const { leftFields, rightFields, fullFields } = splitFieldColumns(CANCELLATION_FORM_ACCOUNT_FIELDS)

  return (
    <section
      className={clsx(
        'section-contents-wrapper',
        'cancellation-form',
        'cancellation-form-step5',
        productStyles.section,
      )}
      ref={sectionRef}
    >
      <div className="section-contents-inner">
        <BaseTitle
          navId="product-resident-cancellation-form"
          used="product"
          type="white"
          subTitle={CANCELLATION_FORM_SECTIONS[4].subTitle}
        />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={productStyles.sectionItem}>
              <div className="form-columns">
                <div className="form-column">
                  {leftFields.map((field) => (
                    <FormFieldRow
                      key={field.name}
                      field={field}
                      value={values[field.name]}
                      onChange={onChange}
                      error={errors[field.name]}
                    />
                  ))}
                </div>
                <div className="form-column">
                  {rightFields.map((field) => (
                    <FormFieldRow
                      key={field.name}
                      field={field}
                      value={values[field.name]}
                      onChange={onChange}
                      error={errors[field.name]}
                    />
                  ))}
                </div>
              </div>
              {fullFields.map((field) => (
                <FormFieldRow
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  onChange={onChange}
                  error={errors[field.name]}
                />
              ))}

              <div className="rule-box">
                <div className="ruleContentsWrapper">
                  <h4 className="rule-title">{CANCELLATION_FORM_RULE.title}</h4>
                  <p className="rule-text">{CANCELLATION_FORM_RULE.text}</p>
                </div>
                <FormCheckbox
                  checked={agreed}
                  onChange={onAgreedChange}
                  label={
                    <>
                      {CANCELLATION_FORM_RULE.title}および個人情報取り扱いの
                      <FormCheckboxAgreementLink>利用規約</FormCheckboxAgreementLink>
                      に同意する
                    </>
                  }
                />
                <div className="button-area">
                  <BaseButton text="確認する" used="cancellationForm" onClick={onConfirm} disabled={!agreed} />
                </div>
                <p className="recaptcha-disclosure">{RECAPTCHA_DISCLOSURE_TEXT}</p>
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
