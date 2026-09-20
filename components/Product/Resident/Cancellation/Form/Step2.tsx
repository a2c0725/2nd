import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import FormFieldRow, { splitFieldColumns } from './FormFieldRow'
import {
  CANCELLATION_FORM_CANCELLATION_FIELDS,
  CANCELLATION_FORM_SECTIONS,
} from '@/constants/product/resident/cancellation/form'
import productStyles from '@/app/product/style.module.scss'

type Step2Props = {
  sectionRef: (el: HTMLElement | null) => void
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
}

export default function Step2({ sectionRef, values, errors, onChange }: Step2Props) {
  const { leftFields, rightFields, fullFields } = splitFieldColumns(CANCELLATION_FORM_CANCELLATION_FIELDS)

  return (
    <section
      className={clsx(
        'section-contents-wrapper',
        'cancellation-form',
        'cancellation-form-step2',
        productStyles.section,
      )}
      ref={sectionRef}
    >
      <div className="section-contents-inner">
        <BaseTitle
          navId="product-resident-cancellation-form"
          used="product"
          type="white"
          subTitle={CANCELLATION_FORM_SECTIONS[1].subTitle}
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
                  <FormFieldRow
                    field={fullFields[1]}
                    value={values[fullFields[1].name]}
                    onChange={onChange}
                    error={errors[fullFields[1].name]}
                  />
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
                  <FormFieldRow
                    field={fullFields[0]}
                    value={values[fullFields[0].name]}
                    onChange={onChange}
                    error={errors[fullFields[0].name]}
                  />
                </div>
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
