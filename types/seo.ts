// SEO相关类型定义

import { Metadata } from 'next'

export interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  locale?: string
  siteName?: string
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player'
    site?: string
    creator?: string
  }
  openGraph?: {
    type?:
      | 'website'
      | 'article'
      | 'book'
      | 'profile'
      | 'music.song'
      | 'music.album'
      | 'music.playlist'
      | 'music.radio_station'
      | 'video.movie'
      | 'video.episode'
      | 'video.tv_show'
      | 'video.other'
    siteName?: string
    locale?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
      type?: string
    }>
    videos?: Array<{
      url: string
      width?: number
      height?: number
      type?: string
    }>
    audio?: Array<{
      url: string
      title?: string
      artist?: string
      album?: string
    }>
  }
  robots?: {
    index?: boolean
    follow?: boolean
    nocache?: boolean
    noimageindex?: boolean
    noarchive?: boolean
    nosnippet?: boolean
    notranslate?: boolean
    maxSnippet?: number
    maxImagePreview?: 'none' | 'standard' | 'large'
    maxVideoPreview?: number
  }
  alternates?: {
    canonical?: string
    languages?: Record<string, string>
    media?: Record<string, string>
    types?: Record<string, string>
  }
  verification?: {
    google?: string
    yandex?: string
    bing?: string
    baidu?: string
  }
  structuredData?: StructuredData[]
}

export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

export interface OrganizationStructuredData extends StructuredData {
  '@type': 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
  contactPoint?: {
    '@type': 'ContactPoint'
    telephone?: string
    contactType?: string
    areaServed?: string | string[]
    availableLanguage?: string | string[]
  }
  address?: {
    '@type': 'PostalAddress'
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
}

export interface WebSiteStructuredData extends StructuredData {
  '@type': 'WebSite'
  name: string
  url: string
  description?: string
  publisher?: OrganizationStructuredData
}

export interface BreadcrumbStructuredData extends StructuredData {
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item?: string
  }>
}

export interface ArticleStructuredData extends StructuredData {
  '@type': 'Article'
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  author: {
    '@type': 'Person'
    name: string
  }
  publisher: OrganizationStructuredData
  mainEntityOfPage: string
}

export interface PerformanceMetrics {
  navigationStart: number
  loadEventEnd: number
  domContentLoadedEventEnd: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
}

export interface PerformanceObserverConfig {
  entryTypes: string[]
  onEntry?: (entry: PerformanceEntry) => void
  onError?: (error: Error) => void
}

export interface OpenGraphImageProps {
  title: string
  description: string
  width?: number
  height?: number
  fontSize?: number
  lineHeight?: number
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}
