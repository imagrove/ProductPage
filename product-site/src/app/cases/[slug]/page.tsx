import { getCaseBySlug, mockCases, GalleryItem } from '@/lib/cases';
import Link from 'next/link';
import CaseGallery from '@/components/CaseGallery';

interface CasePageProps {
  params: { slug: string };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = params;
  let item = await getCaseBySlug(slug);
  if (!item) {
    item = mockCases.find((c) => c.slug === slug) || null;
  }
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">未找到案例</h1>
          <p className="text-gray-600">您访问的案例不存在或已移除。</p>
        </div>
      </div>
    );
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const images = [item.image, ...((item.gallery || []).map((g: GalleryItem) => g.image))].filter(Boolean) as string[];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.description,
    image: images,
    url: `${site}/cases/${item.slug || ''}`,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: '案例', item: `${site}/cases` },
      { '@type': 'ListItem', position: 3, name: item.title, item: `${site}/cases/${item.slug || ''}` },
    ],
  };
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <div className="mb-6">
          <Link href="/cases" className="text-blue-600 hover:text-blue-800">← 返回案例列表</Link>
        </div>
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        {item.image && (
          <img src={item.image} alt={item.title} className="w-full h-64 object-contain bg-gray-50 rounded-md mb-6" />
        )}
        {(item.gallery && item.gallery.length > 0) && (
          <CaseGallery gallery={item.gallery} title={item.title} />
        )}
        <p className="text-gray-700 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}