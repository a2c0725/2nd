import clsx from 'clsx'
import BaseTitle from '@/components/Shared/Title/BaseTitle'
import { NEWS_LIST } from '@/constants/sections/news'
import styles from './style.module.scss'

export default function News() {
  return (
    <section id="news" className={clsx('section-contents-wrapper', styles.news)}>
      <div className="section-contents-inner">
        <BaseTitle navId="news" />
        <div className="section-contents">
          <div className="section-inner">
            <ul className={styles.newsList}>
              {NEWS_LIST.map((item) => (
                <li className={styles.newsItem} key={item.date + item.title}>
                  <div className={styles.newsDate}>{item.date}</div>
                  {item.url ? (
                    <a
                      className={styles.newsText}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <div className={styles.newsText}>{item.title}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
