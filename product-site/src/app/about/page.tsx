// app/about/page.tsx
import ContactModal from '@/components/ContactModal';
import ContactCTASection from '@/components/ContactCTASection';
export default function AboutPage() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '智能展馆多媒体中控系统',
    url: `${site}/about`,
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: `${site}/` },
      { '@type': 'ListItem', position: 2, name: '关于我们', item: `${site}/about` },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">关于我们</h1>
          <p className="text-lg opacity-90">专业的智能展馆解决方案提供商</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-5xl py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">公司简介</h2>
          <p className="text-gray-700 mb-4">我们是一家专注于智能展馆多媒体中控系统研发、生产和销售的高科技企业。凭借多年的行业经验和技术积累，我们致力于为各类展览馆、博物馆、企业展厅等场所提供专业的智能化解决方案。</p>
          <p className="text-gray-700">我们的核心团队由行业资深专家组成，拥有丰富的项目实施经验和创新研发能力。通过不断技术创新和产品优化，我们已成功为众多国内外客户提供了高质量的产品和服务，赢得了广泛的市场认可。</p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">我们的使命</h2>
          <p className="text-gray-700">通过创新技术，打造智能、高效、便捷的展馆多媒体控制体验，助力客户提升展览效果和运营效率，为观众带来沉浸式的参观体验。</p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">我们的愿景</h2>
          <p className="text-gray-700">成为全球领先的智能展馆解决方案提供商，引领行业技术发展方向，推动展览展示行业的数字化、智能化转型。</p>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">核心团队</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded bg-gray-50">
              <img src="https://via.placeholder.com/150" alt="团队成员" className="w-36 h-36 rounded-full mx-auto mb-4" />
              <div className="text-lg font-semibold text-blue-700">张三</div>
              <div className="text-blue-500 mb-2">技术总监</div>
              <p className="text-gray-700 text-sm">拥有10年智能控制系统开发经验，曾主导多个大型展馆项目的技术方案设计和实施。</p>
            </div>
            <div className="text-center p-6 rounded bg-gray-50">
              <img src="https://via.placeholder.com/150" alt="团队成员" className="w-36 h-36 rounded-full mx-auto mb-4" />
              <div className="text-lg font-semibold text-blue-700">李四</div>
              <div className="text-blue-500 mb-2">产品经理</div>
              <p className="text-gray-700 text-sm">专注于用户体验研究和产品设计，致力于打造符合客户需求的智能展馆产品。</p>
            </div>
            <div className="text-center p-6 rounded bg-gray-50">
              <img src="https://via.placeholder.com/150" alt="团队成员" className="w-36 h-36 rounded-full mx-auto mb-4" />
              <div className="text-lg font-semibold text-blue-700">王五</div>
              <div className="text-blue-500 mb-2">项目经理</div>
              <p className="text-gray-700 text-sm">负责项目规划、协调和管理，确保项目按时高质量完成，客户满意度达到100%。</p>
            </div>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">发展历程</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold text-blue-700">2010年</div>
              <p className="text-gray-700">公司成立，专注于展览展示行业技术服务。</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold text-blue-700">2013年</div>
              <p className="text-gray-700">推出第一代展馆多媒体控制系统，获得市场认可。</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold text-blue-700">2016年</div>
              <p className="text-gray-700">完成A轮融资，扩大研发团队，加速产品创新。</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold text-blue-700">2018年</div>
              <p className="text-gray-700">推出基于ESP32技术的新一代智能展馆多媒体中控系统。</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold text-blue-700">2021年</div>
              <p className="text-gray-700">成功实施100+大型展馆项目，服务客户遍布全球。</p>
            </div>
          </div>
        </section>
        
      </div>
      <ContactCTASection />
    </div>
  );
}