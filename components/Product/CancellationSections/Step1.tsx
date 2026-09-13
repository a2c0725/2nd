import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import { CANCELLATION } from '@/constants/product/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step1() {
  const { step1 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step1.heading}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step1.item1.title}</h4>
                <p className={productStyles.desc}>{step1.item1.text}</p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step1.item2.title}</h4>
                <p className={productStyles.desc}>
                  {step1.item2.textLine1}
                  <br />
                  {step1.item2.textLine2}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step1.item3.title}</h4>
                <p className={productStyles.desc}>
                  {step1.item3.textLine1}
                  <br />
                  {step1.item3.textLine2}
                  <br />
                  {step1.item3.textLine3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
