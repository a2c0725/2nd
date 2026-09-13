import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import { CANCELLATION } from '@/constants/product/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step3() {
  const { step3 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step3.heading}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step3.item1.title}</h4>
                <p className={productStyles.desc}>{step3.item1.text}</p>
                <p className={clsx(productStyles.desc, productStyles.annotationMargin)}>
                  {step3.item1.noticeLine1}
                  <br />
                  {step3.item1.noticeLine2}
                  <br />
                  {step3.item1.noticeLine3}
                  <br />
                  {step3.item1.noticeLine4}
                  <br />
                  {step3.item1.noticeLine5}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
