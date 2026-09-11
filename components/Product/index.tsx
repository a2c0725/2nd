import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import Card from '@/components/Shared/Card'
import { PRODUCT_LIST_ITEMS } from '@/constants/products/productList'
import productStyles from '@/app/product/style.module.scss'
import styles from './style.module.scss'

export default function ProductList() {
  return (
    <section className={clsx('section-contents-wrapper', productStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="product" used="product" type="white" />
        <div className="section-contents">
          <div className="section-inner">
            <div className={styles.cards}>
              {PRODUCT_LIST_ITEMS.map((item) => (
                <Card
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  disabled={item.disabled}
                  type={item.type}
                  used='product'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
