import Link from 'next/link';
import ContactModal from '@/components/ContactModal';
import ContactCTASection from '@/components/ContactCTASection';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "智能展馆多媒体中控系统",
    "description": "基于 ESP32 的高性能展馆设备集中控制解决方案，支持独立群组运行与集中管理，提供高性能播放与几何校正。",
    "url": "https://your-domain.com",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">智能展馆多媒体中控系统</h1>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">产品概述</h2>
            <p className="text-gray-700 mb-4">智能展馆多媒体中控系统是一款基于 ESP32 技术的高性能展馆设备集中控制解决方案，支持以下核心能力：</p>
            <ol className="list-decimal ml-5 space-y-2 text-gray-700">
              <li>精细设备控制：实现投影机、电脑主机、照明、播放器、播放软件与音视频内容的精细控制</li>
              <li>独立群组运行：子展项可在无外网与服务器情况下独立运行</li>
              <li>灵活群组集成：支持接入中央服务器进行集中控制与多级权限管理</li>
              <li>高性能播放终端：内置几何校正与 H5 页面渲染，充分利用硬件加速</li>
            </ol>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">系统架构</h2>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">多层级分布式设计</h3>
            <ol className="list-decimal ml-5 space-y-2 text-gray-700 mb-6">
              <li>独立群组结构：群组内部通过 BLE GATT 本地通信</li>
              <li>群组快速集成：通过 WiFi 接入中央 MQTT 服务器</li>
              <li>灵活扩展：支持从单展项到大型展览馆的动态扩展</li>
            </ol>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">核心组件</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>中央控制系统：MQTT 服务器，实现集中管理与权限控制</li>
              <li>群组主节点：ESP32 触控面板作为人机交互中心</li>
              <li>设备控制节点：继电器、RS232、HID 等多协议设备</li>
              <li>智能播放终端：基于 Linux 的嵌入式播放器，支持几何校正与硬件解码</li>
              <li>移动控制终端：平板电脑 APP 提供集中控制界面</li>
            </ul>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">主要功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">智能设备控制</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>多协议统一管理：RS232、USB HID、蓝牙 HID、继电器</li>
                  <li>一键场景切换：联动控制预设场景</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">高性能播放与渲染</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>GPU 硬件加速与几何校正</li>
                  <li>专用硬件解码器支持 4K/8K</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">群组管理与权限</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>集中平台管理多个群组</li>
                  <li>多级权限控制与操作日志</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">技术特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">高性能播放与渲染</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>嵌入式 Linux 播放终端，稳定运行</li>
                  <li>GPU 硬件加速，支持复杂 H5/WebGL 内容</li>
                  <li>专业几何校正，解决不规则投影失真</li>
                  <li>硬件解码器支持 4K/8K 高清播放</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">独立运行与灵活集成</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>群组内部 BLE GATT 本地通信，无外网依赖</li>
                  <li>设备自组织发现与接入，简化安装配置</li>
                  <li>支持热插拔与快速扩展</li>
                  <li>WiFi + MQTT 快速集成中央系统</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">精细控制与权限管理</h4>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>多协议兼容：RS232、USB/蓝牙 HID、继电器</li>
                  <li>设备状态监控与告警</li>
                  <li>多级权限与操作日志审计</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">应用场景</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>数字展馆与博物馆</li>
              <li>企业展厅与品牌中心</li>
              <li>临时展览与活动空间</li>
              <li>异形投影与沉浸式空间</li>
            </ul>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">产品优势</h2>
            <ol className="list-decimal ml-5 space-y-2 text-gray-700">
              <li>独立运行与集中管理兼备</li>
              <li>全方位设备精细控制</li>
              <li>高性能媒体处理</li>
              <li>几何校正专业能力</li>
              <li>灵活部署与扩展</li>
            </ol>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">系统规格</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">硬件规格</h3>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>ESP32 触控面板主控，支持 BLE/WiFi</li>
                  <li>控制节点：继电器、RS232、HID 模块</li>
                  <li>播放终端：Linux 嵌入式播放器，GPU 加速与硬件解码</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">软件规格</h3>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  <li>几何校正与 H5 渲染</li>
                  <li>通信协议：BLE GATT、MQTT、WiFi</li>
                  <li>权限管理与移动端集中控制</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ContactCTASection />

        <section className="py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-700">智能展馆多媒体中控系统，为您的展览空间提供全方位的智能解决方案，助力打造令人难忘的参观体验。</p>
          </div>
        </section>
      </div>
    </>
  );
}
