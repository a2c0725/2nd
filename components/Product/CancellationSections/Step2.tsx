import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import {
  CANCELLATION_STEP2_HEADING,
  CANCELLATION_STEP2_ITEM1_TITLE,
  CANCELLATION_STEP2_ITEM1_TEXT,
  CANCELLATION_STEP2_ITEM2_TITLE,
  CANCELLATION_STEP2_ITEM2_TEXT,
  CANCELLATION_STEP2_ITEM3_TITLE,
  CANCELLATION_STEP2_ITEM3_TEXT_LINE1,
  CANCELLATION_STEP2_ITEM3_TEXT_LINE2,
  CANCELLATION_STEP2_ITEM4_TITLE,
  CANCELLATION_STEP2_ITEM4_TEXT_LINE1,
  CANCELLATION_STEP2_ITEM4_TEXT_LINE2,
  CANCELLATION_STEP2_ITEM5_TITLE,
  CANCELLATION_STEP2_ITEM5_TEXT_LINE1,
  CANCELLATION_STEP2_ITEM5_TEXT_LINE2,
  CANCELLATION_STEP2_ITEM5_TEXT_LINE3,
  CANCELLATION_STEP2_ITEM6_TITLE,
  CANCELLATION_STEP2_ITEM6_TEXT_LINE1,
  CANCELLATION_STEP2_ITEM6_TEXT_LINE2,
  CANCELLATION_STEP2_ITEM6_TEXT_LINE3,
  CANCELLATION_STEP2_ITEM6_TEXT_LINE4,
} from '@/constants/products/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step2() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{CANCELLATION_STEP2_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP2_ITEM1_TITLE}</h4>
                <p className={productStyles.desc}>{CANCELLATION_STEP2_ITEM1_TEXT}</p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP2_ITEM2_TITLE}</h4>
                <p className={productStyles.desc}>{CANCELLATION_STEP2_ITEM2_TEXT}</p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP2_ITEM3_TITLE}</h4>
                <p className={productStyles.desc}>
                  {CANCELLATION_STEP2_ITEM3_TEXT_LINE1}
                  <br />
                  {CANCELLATION_STEP2_ITEM3_TEXT_LINE2}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP2_ITEM4_TITLE}</h4>
                <p className={productStyles.desc}>
                  {CANCELLATION_STEP2_ITEM4_TEXT_LINE1}
                  <br />
                  {CANCELLATION_STEP2_ITEM4_TEXT_LINE2}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP2_ITEM5_TITLE}</h4>
                <p className={productStyles.desc}>
                  {CANCELLATION_STEP2_ITEM5_TEXT_LINE1}
                  <br />
                  {CANCELLATION_STEP2_ITEM5_TEXT_LINE2}
                  <br />
                  {CANCELLATION_STEP2_ITEM5_TEXT_LINE3}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP2_ITEM6_TITLE}</h4>
                <p className={productStyles.desc}>
                  {CANCELLATION_STEP2_ITEM6_TEXT_LINE1}
                  <br />
                  {CANCELLATION_STEP2_ITEM6_TEXT_LINE2}
                  <br />
                  {CANCELLATION_STEP2_ITEM6_TEXT_LINE3}
                  <br />
                  {CANCELLATION_STEP2_ITEM6_TEXT_LINE4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
