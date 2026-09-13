import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import { RENEWAL } from '@/constants/product/renewal'
import productStyles from '@/app/product/style.module.scss'

export default function RenewalSections() {
  const { step1, step2 } = RENEWAL
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-renewal" used="product" type="white" />
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
            </div>

            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step2.heading}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item1.title}</h4>
                <p className={clsx('annotation', productStyles.desc)}>
                  {step2.item1.textLine1}
                  <br />
                  {step2.item1.textLine2}
                  <br />
                  {step2.item1.textLine3}
                </p>
                <p
                  className={clsx(
                    'annotation',
                    productStyles.desc,
                    productStyles.annotationMargin,
                  )}
                >
                  {step2.item2.text}
                </p>
                <p className={clsx('annotation', productStyles.desc)}>
                  {step2.item3.textLine1}
                  <br />
                  {step2.item3.textLine2}
                  <br />
                  {step2.item3.textLine3}
                  <br />
                  {step2.item3.textLine4}
                  <br />
                  {step2.item3.textLine5}
                </p>
                <p
                  className={clsx(
                    'annotation',
                    productStyles.desc,
                    productStyles.annotationMargin,
                  )}
                >
                  {step2.item4.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
