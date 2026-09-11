import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import {
  CANCELLATION_STEP3_HEADING,
  CANCELLATION_STEP3_ITEM1_TITLE,
  CANCELLATION_STEP3_ITEM1_TEXT,
  CANCELLATION_STEP3_ITEM1_NOTICE_LINE1,
  CANCELLATION_STEP3_ITEM1_NOTICE_LINE2,
  CANCELLATION_STEP3_ITEM1_NOTICE_LINE3,
  CANCELLATION_STEP3_ITEM1_NOTICE_LINE4,
  CANCELLATION_STEP3_ITEM1_NOTICE_LINE5,
} from '@/constants/products/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step3() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{CANCELLATION_STEP3_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP3_ITEM1_TITLE}</h4>
                <p className={productStyles.desc}>{CANCELLATION_STEP3_ITEM1_TEXT}</p>
                <p className={clsx(productStyles.desc, productStyles.annotationMargin)}>
                  {CANCELLATION_STEP3_ITEM1_NOTICE_LINE1}
                  <br />
                  {CANCELLATION_STEP3_ITEM1_NOTICE_LINE2}
                  <br />
                  {CANCELLATION_STEP3_ITEM1_NOTICE_LINE3}
                  <br />
                  {CANCELLATION_STEP3_ITEM1_NOTICE_LINE4}
                  <br />
                  {CANCELLATION_STEP3_ITEM1_NOTICE_LINE5}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
