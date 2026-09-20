import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { CANCELLATION } from '@/constants/product/resident/cancellation'
import productStyles from '@/app/product/style.module.scss'

export default function Step1() {
  const { step1 } = CANCELLATION
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product-resident-cancellation" used="product" type="white" />
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
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
