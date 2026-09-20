import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import Card from '@/components/Shared/Card'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { PRODUCT_LIST_ITEMS } from '@/constants/sections/product'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

export default function Product() {
  return (
    <section id="product" className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product" used="product" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={styles.cards}>
              {PRODUCT_LIST_ITEMS.map((item) => (
                <Card
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  disabled={item.disabled}
                  type={item.type}
                  used='product'
                />
              ))}
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
