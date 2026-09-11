import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import {
  RENEWAL_STEP1_HEADING,
  RENEWAL_STEP1_ITEM1_TITLE,
  RENEWAL_STEP1_ITEM1_TEXT,
  RENEWAL_STEP1_ITEM2_TITLE,
  RENEWAL_STEP1_ITEM2_TEXT_LINE1,
  RENEWAL_STEP1_ITEM2_TEXT_LINE2,
  RENEWAL_STEP2_HEADING,
  RENEWAL_STEP2_ITEM1_TITLE,
  RENEWAL_STEP2_ITEM1_TEXT_LINE1,
  RENEWAL_STEP2_ITEM1_TEXT_LINE2,
  RENEWAL_STEP2_ITEM1_TEXT_LINE3,
  RENEWAL_STEP2_ITEM2_TEXT,
  RENEWAL_STEP2_ITEM3_TEXT_LINE1,
  RENEWAL_STEP2_ITEM3_TEXT_LINE2,
  RENEWAL_STEP2_ITEM3_TEXT_LINE3,
  RENEWAL_STEP2_ITEM3_TEXT_LINE4,
  RENEWAL_STEP2_ITEM3_TEXT_LINE5,
  RENEWAL_STEP2_ITEM4_TEXT,
} from '@/constants/products/renewal'
import productStyles from '@/app/product/style.module.scss'

export default function RenewalSections() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-renewal" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RENEWAL_STEP1_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{RENEWAL_STEP1_ITEM1_TITLE}</h4>
                <p className={productStyles.desc}>{RENEWAL_STEP1_ITEM1_TEXT}</p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{RENEWAL_STEP1_ITEM2_TITLE}</h4>
                <p className={productStyles.desc}>
                  {RENEWAL_STEP1_ITEM2_TEXT_LINE1}
                  <br />
                  {RENEWAL_STEP1_ITEM2_TEXT_LINE2}
                </p>
              </div>
            </div>

            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{RENEWAL_STEP2_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{RENEWAL_STEP2_ITEM1_TITLE}</h4>
                <p className={clsx('annotation', productStyles.desc)}>
                  {RENEWAL_STEP2_ITEM1_TEXT_LINE1}
                  <br />
                  {RENEWAL_STEP2_ITEM1_TEXT_LINE2}
                  <br />
                  {RENEWAL_STEP2_ITEM1_TEXT_LINE3}
                </p>
                <p
                  className={clsx(
                    'annotation',
                    productStyles.desc,
                    productStyles.annotationMargin,
                  )}
                >
                  {RENEWAL_STEP2_ITEM2_TEXT}
                </p>
                <p className={clsx('annotation', productStyles.desc)}>
                  {RENEWAL_STEP2_ITEM3_TEXT_LINE1}
                  <br />
                  {RENEWAL_STEP2_ITEM3_TEXT_LINE2}
                  <br />
                  {RENEWAL_STEP2_ITEM3_TEXT_LINE3}
                  <br />
                  {RENEWAL_STEP2_ITEM3_TEXT_LINE4}
                  <br />
                  {RENEWAL_STEP2_ITEM3_TEXT_LINE5}
                </p>
                <p
                  className={clsx(
                    'annotation',
                    productStyles.desc,
                    productStyles.annotationMargin,
                  )}
                >
                  {RENEWAL_STEP2_ITEM4_TEXT}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
