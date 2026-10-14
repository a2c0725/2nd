import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { BUSINESS_BOTTOM_ITEMS, BUSINESS_TOP_ITEMS } from '@/constants/sections/business'
import styles from './style.module.scss'

export default function Business() {
  return (
    <section id="business" className={clsx('section-contents-wrapper', styles.business)}>
      <div className="section-contents-inner">
        <BaseTitle navId="business" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={styles.bussinessTopContents}>
              {BUSINESS_TOP_ITEMS.map((item) => (
                <dl className={styles.businessContent} key={item.body}>
                  <dt className={styles.bussinessHead}>
                    <img className={styles.bussinessImg} src={item.img} alt={item.alt} />
                    <div className={styles.bussinessTitle}>{item.title}</div>
                  </dt>
                  <dd className={styles.bussinessBody}>{item.body}</dd>
                </dl>
              ))}
            </div>
            <div className={styles.bussinessBottomContents}>
              {BUSINESS_BOTTOM_ITEMS.map((item) => (
                <dl className={styles.businessContent} key={item.body}>
                  <dt className={styles.bussinessHead}>
                    <img className={styles.bussinessImg} src={item.img} alt={item.alt} />
                  </dt>
                  <dd className={styles.bussinessBody}>{item.body}</dd>
                </dl>
              ))}
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
