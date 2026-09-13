'use client'

import Top from '@/components/Sections/Top'
import News from '@/components/Sections/News'
import About from '@/components/Sections/About'
import Business from '@/components/Sections/Business'
import Product from '@/components/Sections/Product'
import Company from '@/components/Sections/Company'
import Access from '@/components/Sections/Access'
import Contact from '@/components/Sections/Contact'
import { useHomeInteractions } from '@/hooks/useHomeInteractions'

export default function HomePage() {
  useHomeInteractions()

  return (
    <>
      <Top />
      <News />
      <About />
      <Business />
      <Product />
      <Company />
      <Access />
      <Contact />
    </>
  )
}
