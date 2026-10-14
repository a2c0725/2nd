import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import Card from '@/components/Shared/Card'
import ScrollableSectionInner from '@/components/Shared/ScrollableSectionInner'
import { SUPPORT_LIST_ITEMS } from '@/constants/sections/support'
import supportStyles from '@/app/support/style.module.scss'
import styles from './style.module.scss'

export default function Support() {
  return (
    <section id="support" className={clsx('section-contents-wrapper', supportStyles.section)}>
      <div className="section-contents-inner">
        <BaseTitle navId="support" used="support" type="white" />
        <div className="section-contents">
          <ScrollableSectionInner>
            <div className={styles.cards}>
              {SUPPORT_LIST_ITEMS.map((item) => (
                <Card
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  disabled={item.disabled}
                  type={item.type}
                  used='support'
                />
              ))}
            </div>
          </ScrollableSectionInner>
        </div>
      </div>
    </section>
  )
}
