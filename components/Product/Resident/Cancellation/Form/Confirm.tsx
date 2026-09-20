import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import FormLabel from '@/components/Shared/FormLabel'
import {
  CANCELLATION_FORM_SECTIONS,
  CANCELLATION_FORM_CONFIRM_SUBTITLE,
} from '@/constants/product/resident/cancellation/form'
import { RECAPTCHA_DISCLOSURE_TEXT } from '@/constants/recaptcha'
import { resolveConfirmValue } from './resolveConfirmValue'
import productStyles from '@/app/product/style.module.scss'

type ConfirmProps = {
  values: Record<string, string>
  submitError: string
  isSubmitting: boolean
  onBack: () => void
  onSubmit: () => void
}

export default function Confirm({ values, submitError, isSubmitting, onBack, onSubmit }: ConfirmProps) {
  return (
    <section className={clsx('section-contents-wrapper', 'cancellation-form', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle
          navId="product-resident-cancellation-form"
          used="product"
          type="white"
          subTitle={CANCELLATION_FORM_CONFIRM_SUBTITLE}
        />
        <div className="section-contents">
          <ScrollableSectionInner className="scrollable-always">
            <div className={clsx(productStyles.sectionItem, 'confirm-wrapper')}>
              {CANCELLATION_FORM_SECTIONS.map((section) => {
                const visibleFields = section.fields.filter((field) => values[field.name]?.trim())
                if (visibleFields.length === 0) return null
                return (
                  <div className={productStyles.sectionItemContents} key={section.key}>
                    <h3 className={productStyles.sectionSubTitle}>{section.heading}</h3>
                    <div className="confirm-field-list">
                      {visibleFields.map((field) => (
                        <div className={clsx('form-row', 'form-row-confirm')} key={field.name}>
                          <FormLabel label={field.label} type={field.type} used="productForm" />
                          <span className="confirm-value">
                            {resolveConfirmValue(field, values[field.name])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {submitError && <p className="submit-error">{submitError}</p>}

              <div className="button-area">
                <BaseButton text="戻る" used="cancellationForm" onClick={onBack} disabled={isSubmitting} />
                <BaseButton
                  text={isSubmitting ? '送信中...' : '送信する'}
                  used="cancellationForm"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                />
              </div>
              <p className="recaptcha-disclosure">{RECAPTCHA_DISCLOSURE_TEXT}</p>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
