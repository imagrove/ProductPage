'use client'

import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export default function SEO({
  title = '专业多媒体播控系统定制服务商 | 一站式技术解决方案',
  description = '10年+行业经验，提供全流程定制开发的多媒体播控系统。支持分布式群组控制、多协议兼容、云端+本地双重保障。',
  keywords = '多媒体播控系统,数字展馆,博物馆控制系统,企业展厅,分布式控制,多屏联动,远程管控',
  image = '/og-image.jpg',
  url = 'https://multimedia-control-system.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = '多媒体播控系统团队',
}: SEOProps) {
  const fullTitle = title.includes('多媒体播控系统') ? title : `${title} | 多媒体播控系统`

  return (
    <Head>
      {/* 基础SEO */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />

      {/* Open Graph */}
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content='多媒体播控系统' />
      <meta property='og:locale' content='zh_CN' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      {/* 文章相关 */}
      {publishedTime && <meta property='article:published_time' content={publishedTime} />}
      {modifiedTime && <meta property='article:modified_time' content={modifiedTime} />}
      {author && <meta property='article:author' content={author} />}

      {/* 规范链接 */}
      <link rel='canonical' href={url} />

      {/* 结构化数据 */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'Article' : 'WebPage',
            headline: fullTitle,
            description: description,
            image: image,
            url: url,
            author: {
              '@type': 'Organization',
              name: author,
            },
            publisher: {
              '@type': 'Organization',
              name: '多媒体播控系统',
              logo: {
                '@type': 'ImageObject',
                url: 'https://multimedia-control-system.com/logo.png',
              },
            },
            ...(publishedTime && { datePublished: publishedTime }),
            ...(modifiedTime && { dateModified: modifiedTime }),
          }),
        }}
      />
    </Head>
  )
}
