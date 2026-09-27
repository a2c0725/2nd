import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import FormFieldRow from './FormFieldRow'
import {
  CANCELLATION_FORM_RELOCATION_FIELDS,
  CANCELLATION_FORM_SECTIONS,
} from '@/constants/support/resident/cancellation/form'
import supportStyles from '@/app/support/style.module.scss'

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
  const restFields = CANCELLATION_FORM_RELOCATION_FIELDS.filter(
    (field) => field.name !== 'relocationStatus',
  )

  return (
    <section
      className={clsx(
        'section-contents-wrapper',
        'cancellation-form',
        'cancellation-form-step4',
        supportStyles.section,
      )}
      ref={sectionRef}
    >
      <div className="section-contents-inner">
        <BaseTitle
          navId="support-resident-cancellation-form"
          used="support"
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
            <div className={supportStyles.sectionItem}>
              {restFields.map((field) => (
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
