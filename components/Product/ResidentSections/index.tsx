import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import {
  RESIDENT_GUIDANCE_HEADING,
  RESIDENT_GUIDANCE_TEXT_LINE1,
  RESIDENT_GUIDANCE_TEXT_LINE2,
  RESIDENT_PROCEDURES_HEADING,
  procedureButtons,
  RESIDENT_LIFESTYLE_HEADING,
  lifestyleButtons,
} from '@/constants/products/resident'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

export default function ResidentSections() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident" used="product" type="white" />
        <div className="section-contents">
          <div className={clsx('section-inner', productStyles.resident)}>
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RESIDENT_GUIDANCE_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <p className={productStyles.desc}>
                  {RESIDENT_GUIDANCE_TEXT_LINE1}
                  <br />
                  {RESIDENT_GUIDANCE_TEXT_LINE2}
                </p>
              </div>
            </div>

            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RESIDENT_PROCEDURES_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <div className={styles.buttonGroup}>
                  {procedureButtons.map((button) => (
                    <BaseButton key={button.text} text={button.text} url={button.url} />
                  ))}
                </div>
              </div>
            </div>

            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RESIDENT_LIFESTYLE_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <div className={styles.buttonGroup}>
                  {lifestyleButtons.map((button) => (
                    <BaseButton key={button.text} text={button.text} url={button.url} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
