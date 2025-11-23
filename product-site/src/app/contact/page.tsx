// app/contact/page.tsx
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">联系我们</h1>
          <p className="text-lg opacity-90">如果您对我们的产品和服务有任何疑问，请随时与我们联系</p>
        </div>
      </div>
      <div className="container mx-auto px-4 max-w-6xl py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded">
              <h3 className="text-xl font-semibold text-blue-700">联系方式</h3>
              <p className="text-gray-700 mt-2">感谢您对我们的关注。无论您是需要产品咨询、技术支持还是商务合作，我们的团队都会为您提供专业、高效的服务。</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center mr-3">🏢</div>
                  <div>
                    <div className="font-semibold text-blue-700">公司地址</div>
                    <div className="text-gray-700">北京市海淀区中关村科技园区8号楼</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center mr-3">📞</div>
                  <div>
                    <div className="font-semibold text-blue-700">电话咨询</div>
                    <div className="text-gray-700">400-123-4567<br />工作时间：周一至周五 9:00-18:00</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center mr-3">✉️</div>
                  <div>
                    <div className="font-semibold text-blue-700">电子邮箱</div>
                    <div className="text-gray-700">sales@example.com（销售咨询）<br />support@example.com（技术支持）</div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="font-semibold text-blue-700 mb-2">关注我们</div>
                <div className="flex gap-3">
                  <a href="#" title="微信" className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center">📱</a>
                  <a href="#" title="微博" className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center">🔹</a>
                  <a href="#" title="LinkedIn" className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center">💼</a>
                  <a href="#" title="YouTube" className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white flex items-center justify-center">▶️</a>
                </div>
              </div>
              <div className="mt-6">
                <div className="font-semibold text-blue-700 mb-2">地图位置</div>
                <div className="rounded overflow-hidden shadow bg-gray-100 h-64 flex items-center justify-center">
                  <p className="text-gray-600 text-center px-6">地图加载中...<br /><br />实际使用时，这里将显示公司的地理位置地图。<br />北京市海淀区中关村科技园区8号楼</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">联系表单</h3>
              <ContactForm />
            </div>
          </div>
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">如何获取产品报价？</h3>
              <p className="text-gray-700">您可以通过联系表单提交需求，或者直接拨打我们的销售热线400-123-4567，我们的销售团队会根据您的具体需求提供详细报价。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">产品支持哪些地区的服务？</h3>
              <p className="text-gray-700">我们的服务覆盖全国各地区，同时也支持海外项目的实施和维护。具体服务内容可以根据项目需求进行定制。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">售后服务包含哪些内容？</h3>
              <p className="text-gray-700">我们提供7×24小时技术支持热线、远程协助、定期维护保养、系统升级服务等全方位的售后支持，确保系统稳定运行。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">项目实施周期是多久？</h3>
              <p className="text-gray-700">项目实施周期根据项目规模和复杂程度而定，一般来说，小型项目1-2周，中型项目1-2个月，大型项目2-6个月。我们会在项目开始前提供详细的时间规划。</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}