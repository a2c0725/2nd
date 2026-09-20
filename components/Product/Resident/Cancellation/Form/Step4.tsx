import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import FormFieldRow, { splitFieldColumns } from './FormFieldRow'
import {
  CANCELLATION_FORM_RELOCATION_FIELDS,
  CANCELLATION_FORM_SECTIONS,
} from '@/constants/product/resident/cancellation/form'
import productStyles from '@/app/product/style.module.scss'

type Step4Props = {
  sectionRef: (el: HTMLElement | null) => void
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
}

export default function Step4({ sectionRef, values, errors, onChange }: Step4Props) {
  const relocationStatusField = CANCELLATION_FORM_RELOCATION_FIELDS.find(
    (field) => field.name === 'relocationStatus',
  )
  const { leftFields, rightFields, fullFields } = splitFieldColumns(
    CANCELLATION_FORM_RELOCATION_FIELDS.filter((field) => field.name !== 'relocationStatus'),
  )

  return (
    <section
      className={clsx(
        'section-contents-wrapper',
        'cancellation-form',
        'cancellation-form-step4',
        productStyles.section,
      )}
      ref={sectionRef}
    >
      <div className="section-contents-inner">
        <BaseTitle
          navId="product-resident-cancellation-form"
          used="product"
          type="white"
          subTitle={CANCELLATION_FORM_SECTIONS[3].subTitle}
        />
        <div className="section-contents">
          <ScrollableSectionInner>
            {relocationStatusField && (
              <FormFieldRow
                field={relocationStatusField}
                value={values[relocationStatusField.name]}
                onChange={onChange}
                error={errors[relocationStatusField.name]}
              />
            )}
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
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
