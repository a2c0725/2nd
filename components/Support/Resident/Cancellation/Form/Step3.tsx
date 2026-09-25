import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import FormFieldRow, { splitFieldColumns } from './FormFieldRow'
import {
  CANCELLATION_FORM_CONTRACTOR_FIELDS,
  CANCELLATION_FORM_SECTIONS,
} from '@/constants/support/resident/cancellation/form'
import supportStyles from '@/app/support/style.module.scss'

type Step3Props = {
  sectionRef: (el: HTMLElement | null) => void
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
}

export default function Step3({ sectionRef, values, errors, onChange }: Step3Props) {
  const { leftFields, rightFields, fullFields } = splitFieldColumns(CANCELLATION_FORM_CONTRACTOR_FIELDS)

  return (
    <section
      className={clsx(
        'section-contents-wrapper',
        'cancellation-form',
        'cancellation-form-step3',
        supportStyles.section,
      )}
      ref={sectionRef}
    >
      <div className="section-contents-inner">
        <BaseTitle
          navId="support-resident-cancellation-form"
          used="support"
          type="white"
          subTitle={CANCELLATION_FORM_SECTIONS[2].subTitle}
        />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={supportStyles.sectionItem}>
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
