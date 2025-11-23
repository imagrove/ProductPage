import { client } from '../../tina/__generated__/client';

export interface GalleryItem {
  image: string;
  title?: string;
  description?: string;
}

export interface CaseItem {
  title: string;
  description: string;
  image?: string;
  slug?: string;
  gallery?: GalleryItem[];
}

export async function getCases(): Promise<CaseItem[]> {
  try {
    let result;
    try {
      // GraphQL connection for Tina collection 'case'
      result = await client.caseConnection();
    } catch (e) {
      return mockCases;
    }
    const edges = result?.data?.caseConnection?.edges || [];
    const items: CaseItem[] = edges
      .filter((e: any) => e?.node)
      .map((e: any) => ({
        title: e.node.title,
        description: e.node.description,
        image: e.node.image,
        slug: e.node.slug,
        gallery: Array.isArray(e.node.gallery)
          ? e.node.gallery.map((g: any) =>
              typeof g === 'string'
                ? { image: g }
                : { image: g?.image, title: g?.title, description: g?.description }
            )
          : undefined,
      }));
    return items.length > 0 ? items : mockCases;
  } catch (error) {
    return mockCases;
  }
}

export async function getCaseBySlug(slug: string): Promise<CaseItem | null> {
  try {
    // Fetch all then find by slug for simplicity
    const items = await getCases();
    const found = items.find((i) => i.slug === slug || i.title === slug);
    return found || null;
  } catch (e) {
    return mockCases.find((i) => i.slug === slug) || null;
  }
}

export const mockCases: CaseItem[] = [
  {
    title: '数字展馆案例',
    description: '沉浸式空间与多设备联动控制展示，稳定运行与集中管理并重。',
    image: '/images/products/webcam.svg',
    slug: 'digital-museum',
    gallery: [
      { image: '/images/products/webcam.svg', title: '展馆主视角' },
      { image: '/images/products/headphones.svg', title: '设备局部细节' },
    ],
  },
  {
    title: '企业展厅案例',
    description: '品牌中心多媒体联展与集中管理，支持一键场景切换。',
    image: '/images/products/smartwatch.svg',
    slug: 'brand-center',
    gallery: [
      { image: '/images/products/smartwatch.svg', title: '展厅主题区' },
      { image: '/images/products/gaming-mouse.svg', title: '互动装置' },
    ],
  },
  {
    title: '活动空间案例',
    description: '临时展览快速部署与群组集成，保障现场可靠与灵活扩展。',
    image: '/images/products/speaker.svg',
    slug: 'event-space',
    gallery: [
      { image: '/images/products/speaker.svg', title: '临展声像系统' },
      { image: '/images/products/webcam.svg', title: '现场设备布局' },
    ],
  },
];