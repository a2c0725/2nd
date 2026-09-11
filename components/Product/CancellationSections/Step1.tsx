import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import {
  CANCELLATION_STEP1_HEADING,
  CANCELLATION_STEP1_ITEM1_TITLE,
  CANCELLATION_STEP1_ITEM1_TEXT,
  CANCELLATION_STEP1_ITEM2_TITLE,
  CANCELLATION_STEP1_ITEM2_TEXT_LINE1,
  CANCELLATION_STEP1_ITEM2_TEXT_LINE2,
  CANCELLATION_STEP1_ITEM3_TITLE,
  CANCELLATION_STEP1_ITEM3_TEXT_LINE1,
  CANCELLATION_STEP1_ITEM3_TEXT_LINE2,
  CANCELLATION_STEP1_ITEM3_TEXT_LINE3,
} from '@/constants/products/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step1() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{CANCELLATION_STEP1_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP1_ITEM1_TITLE}</h4>
                <p className={productStyles.desc}>{CANCELLATION_STEP1_ITEM1_TEXT}</p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP1_ITEM2_TITLE}</h4>
                <p className={productStyles.desc}>
                  {CANCELLATION_STEP1_ITEM2_TEXT_LINE1}
                  <br />
                  {CANCELLATION_STEP1_ITEM2_TEXT_LINE2}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP1_ITEM3_TITLE}</h4>
                <p className={productStyles.desc}>
                  {CANCELLATION_STEP1_ITEM3_TEXT_LINE1}
                  <br />
                  {CANCELLATION_STEP1_ITEM3_TEXT_LINE2}
                  <br />
                  {CANCELLATION_STEP1_ITEM3_TEXT_LINE3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
