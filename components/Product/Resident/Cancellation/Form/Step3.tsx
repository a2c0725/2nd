import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import FormFieldRow, { splitFieldColumns } from './FormFieldRow'
import {
  CANCELLATION_FORM_CONTRACTOR_FIELDS,
  CANCELLATION_FORM_SECTIONS,
} from '@/constants/product/resident/cancellation/form'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

type Step3Props = {
  sectionRef: (el: HTMLElement | null) => void
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
}

export default function Step3({ sectionRef, values, errors, onChange }: Step3Props) {
  const { leftFields, rightFields, fullFields } = splitFieldColumns(CANCELLATION_FORM_CONTRACTOR_FIELDS)

  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)} ref={sectionRef}>
      <div className="section-contents-inner">
        <BaseTitle
          navId="product-resident-cancellation-form"
          used="product"
          type="white"
          subTitle={CANCELLATION_FORM_SECTIONS[2].subTitle}
        />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={productStyles.sectionItem}>
              <div className={styles.formColumns}>
                <div className={styles.formColumn}>
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
                <div className={styles.formColumn}>
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
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
