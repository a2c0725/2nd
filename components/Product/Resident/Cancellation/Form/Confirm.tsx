import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import FormLabel from '@/components/Shared/Form/FormLabel'
import {
  CANCELLATION_FORM_SECTIONS,
  CANCELLATION_FORM_CONFIRM_SUBTITLE,
} from '@/constants/product/resident/cancellation/form'
import { RECAPTCHA_DISCLOSURE_TEXT } from '@/constants/recaptcha'
import { resolveConfirmValue } from './resolveConfirmValue'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

type ConfirmProps = {
  values: Record<string, string>
  submitError: string
  isSubmitting: boolean
  onBack: () => void
  onSubmit: () => void
}

export default function Confirm({ values, submitError, isSubmitting, onBack, onSubmit }: ConfirmProps) {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle
          navId="product-resident-cancellation-form"
          used="product"
          type="white"
          subTitle={CANCELLATION_FORM_CONFIRM_SUBTITLE}
        />
        <div className="section-contents">
          <ScrollableSectionInner className={styles.scrollableAlways}>
            <div className={clsx(productStyles.sectionItem, styles.confirmWrapper)}>
              {CANCELLATION_FORM_SECTIONS.map((section) => {
                const visibleFields = section.fields.filter((field) => values[field.name]?.trim())
                if (visibleFields.length === 0) return null
                return (
                  <div className={productStyles.sectionItemContents} key={section.key}>
                    <h3 className={productStyles.sectionSubTitle}>{section.heading}</h3>
                    <div className={styles.confirmFieldList}>
                      {visibleFields.map((field) => (
                        <div className={clsx(styles.formRow, styles.formRowConfirm)} key={field.name}>
                          <FormLabel label={field.label} type={field.type} used="productForm" />
                          <span className={styles.confirmValue}>
                            {resolveConfirmValue(field, values[field.name])}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}

              {submitError && <p className={styles.submitError}>{submitError}</p>}

              <div className={styles.buttonArea}>
                <BaseButton text="戻る" used="cancellationForm" onClick={onBack} disabled={isSubmitting} />
                <BaseButton
                  text={isSubmitting ? '送信中...' : '送信する'}
                  used="cancellationForm"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                />
              </div>
              <p className={styles.recaptchaDisclosure}>{RECAPTCHA_DISCLOSURE_TEXT}</p>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
