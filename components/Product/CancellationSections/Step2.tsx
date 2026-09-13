import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import { CANCELLATION } from '@/constants/product/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step2() {
  const { step2 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step2.heading}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item1.title}</h4>
                <p className={productStyles.desc}>{step2.item1.text}</p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item2.title}</h4>
                <p className={productStyles.desc}>{step2.item2.text}</p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item3.title}</h4>
                <p className={productStyles.desc}>
                  {step2.item3.textLine1}
                  <br />
                  {step2.item3.textLine2}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item4.title}</h4>
                <p className={productStyles.desc}>
                  {step2.item4.textLine1}
                  <br />
                  {step2.item4.textLine2}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item5.title}</h4>
                <p className={productStyles.desc}>
                  {step2.item5.textLine1}
                  <br />
                  {step2.item5.textLine2}
                  <br />
                  {step2.item5.textLine3}
                </p>
              </div>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item6.title}</h4>
                <p className={productStyles.desc}>
                  {step2.item6.textLine1}
                  <br />
                  {step2.item6.textLine2}
                  <br />
                  {step2.item6.textLine3}
                  <br />
                  {step2.item6.textLine4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
