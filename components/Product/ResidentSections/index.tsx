import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import {
  RESIDENT,
  RESIDENT_PROCEDURE_BUTTONS,
  RESIDENT_LIFESTYLE_BUTTONS,
} from '@/constants/product/resident'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

export default function ResidentSections() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident" used="product" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner className={productStyles.resident}>
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RESIDENT.guidanceHeading}</h3>
              <div className={productStyles.sectionItemContents}>
                <p className={productStyles.desc}>{RESIDENT.guidanceText}</p>
              </div>
            </div>

            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RESIDENT.proceduresHeading}</h3>
              <div className={productStyles.sectionItemContents}>
                <div className={styles.buttonGroup}>
                  {RESIDENT_PROCEDURE_BUTTONS.map((button) => (
                    <BaseButton key={button.text} text={button.text} url={button.url} used="resident" />
                  ))}
                </div>
              </div>
            </div>

            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RESIDENT.lifestyleHeading}</h3>
              <div className={productStyles.sectionItemContents}>
                <div className={styles.buttonGroup}>
                  {RESIDENT_LIFESTYLE_BUTTONS.map((button) => (
                    <BaseButton key={button.text} text={button.text} url={button.url} used="resident" />
                  ))}
                </div>
              </div>
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
