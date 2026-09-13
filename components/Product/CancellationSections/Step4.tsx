import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import BaseButton from '@/components/Shared/Button/BaseButton'
import { CANCELLATION, CANCELLATION_STEP4_BUTTONS } from '@/constants/product/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step4() {
  const { step4 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step4.heading}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step4.item1.title}</h4>
                <p className={productStyles.desc}>
                  {step4.item1.textLine1}
                  <br />
                  {step4.item1.textLine2}
                  <br />
                  {step4.item1.textLine3}
                  <br />
                </p>
                <p className={clsx(productStyles.desc, productStyles.annotationMargin)}>
                  {step4.item1.notice}
                </p>
              </div>
              <div className={clsx(productStyles.annotationBox, productStyles.sectionItemContents)}>
                <h4 className={productStyles.sectionSubTitle}>{step4.item2.title}</h4>
                <p className={productStyles.desc}>{step4.item2.text}</p>
              </div>
              <div className={productStyles.downloadButtons}>
                {CANCELLATION_STEP4_BUTTONS.map((button) => (
                  <BaseButton key={button.text} text={button.text} url={button.url} used="resident" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
