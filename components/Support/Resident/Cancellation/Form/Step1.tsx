import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import FormFieldRow from './FormFieldRow'
import {
  CANCELLATION_FORM_LEASE_FIELDS,
  CANCELLATION_FORM_SECTIONS,
} from '@/constants/support/resident/cancellation/form'
import supportStyles from '@/app/support/style.module.scss'

type Step1Props = {
  sectionRef: (el: HTMLElement | null) => void
  values: Record<string, string>
  errors: Record<string, string>
  onChange: (name: string, value: string) => void
}

export default function Step1({ sectionRef, values, errors, onChange }: Step1Props) {
  return (
    <section
      className={clsx(
        'section-contents-wrapper',
        'cancellation-form',
        'cancellation-form-step1',
        supportStyles.section,
      )}
      ref={sectionRef}
    >
      <div className="section-contents-inner">
        <BaseTitle
          navId="support-resident-cancellation-form"
          used="support"
          type="white"
          subTitle={CANCELLATION_FORM_SECTIONS[0].subTitle}
        />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={supportStyles.sectionItem}>
              {CANCELLATION_FORM_LEASE_FIELDS.map((field) => (
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
