import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import {
  CANCELLATION_STEP4_HEADING,
  CANCELLATION_STEP4_ITEM1_TITLE,
  CANCELLATION_STEP4_ITEM1_TEXT_LINE1,
  CANCELLATION_STEP4_ITEM1_TEXT_LINE2,
  CANCELLATION_STEP4_ITEM1_TEXT_LINE3,
  CANCELLATION_STEP4_ITEM1_NOTICE,
  CANCELLATION_STEP4_ITEM2_TITLE,
  CANCELLATION_STEP4_ITEM2_TEXT,
  Step4_buttons,
} from '@/constants/products/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step4() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{CANCELLATION_STEP4_HEADING}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP4_ITEM1_TITLE}</h4>
                <p className={productStyles.desc}>
                  {CANCELLATION_STEP4_ITEM1_TEXT_LINE1}
                  <br />
                  {CANCELLATION_STEP4_ITEM1_TEXT_LINE2}
                  <br />
                  {CANCELLATION_STEP4_ITEM1_TEXT_LINE3}
                  <br />
                </p>
                <p className={clsx(productStyles.desc, productStyles.annotationMargin)}>
                  {CANCELLATION_STEP4_ITEM1_NOTICE}
                </p>
              </div>
              <div className={clsx(productStyles.annotationBox, productStyles.sectionItemContents)}>
                <h4 className={productStyles.sectionSubTitle}>{CANCELLATION_STEP4_ITEM2_TITLE}</h4>
                <p className={productStyles.desc}>{CANCELLATION_STEP4_ITEM2_TEXT}</p>
              </div>
              <div className={productStyles.downloadButtons}>
                {Step4_buttons.map((button) => (
                  <BaseButton key={button.text} text={button.text} url={button.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
