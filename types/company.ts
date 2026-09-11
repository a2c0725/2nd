import type { ReactNode } from 'react'

export type CompanyInfoRow = {
  title: string
  text: ReactNode
}

export type CompanyOffice = {
  title: string
  postalCode: string
  address: string
  mapEmbedUrl: string
}
