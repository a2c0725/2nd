import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/Section/ScrollableSectionInner'
import { RENEWAL } from '@/constants/product/renewal'
import productStyles from '@/app/product/style.module.scss'

export default function RenewalSections() {
  const { step1, step2 } = RENEWAL
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-renewal" used="product" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step1.heading}</h3>
              {step1.items.map((item) => (
                <div className={productStyles.sectionItemContents} key={item.title}>
                  <h4 className={productStyles.sectionSubTitle}>{item.title}</h4>
                  <p className={productStyles.desc}>{item.text}</p>
                </div>
              ))}
            </div>

            <div className={productStyles.sectionItem}>
              <h3 className={productStyles.heading}>{step2.heading}</h3>
              <div className={productStyles.sectionItemContents}>
                <h4 className={productStyles.sectionSubTitle}>{step2.item1.title}</h4>
                <p className={clsx('annotation', productStyles.desc)}>{step2.item1.text}</p>
                <p
                  className={clsx(
                    'annotation',
                    productStyles.desc,
                    productStyles.annotationMargin,
                  )}
                >
                  {step2.item2.text}
                </p>
                <p className={clsx('annotation', productStyles.desc)}>{step2.item3.text}</p>
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
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
