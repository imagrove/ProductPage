'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from '@/components/ui/FadeInUp'
import type { FeatureItem, TechFeature } from '@/types/components'

// 核心优势数据
const advantages: FeatureItem[] = [
  {
    title: '深度定制能力',
    description: '提供从需求分析到售后支持的全流程定制服务，满足不同展馆的个性化需求',
    icon: '🎯',
    features: [
      '全流程定制服务：需求分析 → 方案设计 → 部署实施 → 培训交付 → 售后支持',
      '模块化定制：控制面板功能、播放终端性能、设备控制模块、系统界面、权限管理等全方位定制',
      '硬件灵活适配：根据客户需求选择不同性能的硬件配置，支持工业级和商用级终端选择',
      '软件专属开发：支持基于 H5、WebGL、Three.js 的交互内容开发，定制专门的播放软件',
    ],
  },
  {
    title: '丰富的项目经验',
    description: '服务多个行业领域，具备丰富的展馆多媒体项目经验和成功案例',
    icon: '🏆',
    features: [
      '多行业服务：数字展馆、博物馆、企业展厅、品牌中心、文化与科技融合空间等',
      '成功案例：已完成国内多个展馆的多媒体项目，具备丰富的展馆多媒体项目经验',
      '三方合作模式：作为技术支持方与总包方、场地方和内容设计方形成高效合作',
      '快速交付：支持快速部署，系统集成周期短，确保项目按时完成',
    ],
  },
  {
    title: '技术领先优势',
    description: '基于先进技术架构，确保系统长期稳定运行和高性能表现',
    icon: '🚀',
    features: [
      'Linux 嵌入式架构：多重安全机制和异常恢复能力，确保长期稳定运行',
      '高性能图形渲染：基于 WebGL 硬件加速，支持复杂 3D 场景和交互内容',
      '独立运行能力：无外网环境下独立运行，确保展览不受网络环境影响',
      '专业团队支持：专业技术团队提供 7×24 小时技术支持和维护服务',
    ],
  },
]

// 技术特色展示
const techFeatures: TechFeature[] = [
  {
    title: '模块化架构',
    description: '灵活组合，按需定制',
    icon: '🧩',
  },
  {
    title: '高性能渲染',
    description: 'WebGL硬件加速，流畅体验',
    icon: '⚡',
  },
  {
    title: '安全稳定',
    description: '多重保障，可靠运行',
    icon: '🛡️',
  },
  {
    title: '快速部署',
    description: '专业团队，高效实施',
    icon: '🚀',
  },
]

export default function Advantages() {
  return (
    <section className='py-24 lg:py-32'>
      <div className='container'>
        {/* 章节标题 */}
        <FadeInUp className='mb-20 text-center' delay={0.1}>
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl'>
            核心优势
          </h2>
          <p className='mx-auto max-w-3xl text-center text-lg text-gray-600 sm:text-xl'>
            10年+行业经验积累，为您的多媒体播控系统提供专业可靠的技术保障
          </p>
        </FadeInUp>

        {/* 核心优势展示 */}
        <div className='space-y-12 lg:space-y-16'>
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: '-50px' }}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* 图标和标题区域 */}
              <div className='text-center lg:w-1/3 lg:text-left'>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className='mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-3xl text-white lg:h-24 lg:w-24 lg:text-4xl'
                >
                  {advantage.icon}
                </motion.div>

                <h3 className='mb-3 text-2xl font-bold text-gray-900 lg:text-3xl'>
                  {advantage.title}
                </h3>

                <p className='text-lg leading-relaxed text-gray-600'>{advantage.description}</p>
              </div>

              {/* 特性列表区域 */}
              <div className='lg:w-2/3'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {advantage.features?.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: featureIndex % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + featureIndex * 0.1 }}
                      viewport={{ once: true, margin: '-20px' }}
                      className='group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md'
                      whileHover={{
                        y: -5,
                        scale: 1.02,
                        shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className='flex items-start'>
                        <div className='mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600'>
                          {featureIndex + 1}
                        </div>
                        <p className='leading-relaxed text-gray-700'>{feature}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
