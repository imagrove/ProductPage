'use client'

import { motion } from 'framer-motion'
import { FadeInUp } from '@/components/ui/FadeInUp'
import type { FeatureItem, TechFeature } from '@/types/components'

// 核心优势数据
const advantages: FeatureItem[] = [
  {
    title: '深度定制・精准匹配需求',
    description: '全流程一站式服务（需求→设计→落地→售后），支持硬件配置、功能模块、交互内容（H5/3D）全方位定制，灵活适配商用 / 工业级场景，打造专属解决方案。',
    icon: '🎯',
  },
  {
    title: '十年积淀・高效交付保障',
    description: '服务数字展馆、博物馆等多行业，完成多个大型项目落地，成熟三方合作模式 + 短周期集成能力，确保项目按时高质量交付。',
    icon: '🏆',
  },
  {
    title: '技术硬核・稳定可靠运行',
    description: 'Linux 嵌入式架构 + WebGL 硬件加速，支持无外网独立运行，多重安全机制 + 7×24 小时技术支持，保障长期稳定无故障。',
    icon: '🚀',
  },
]

export default function Advantages() {
  return (
    <section className='py-20 lg:py-28'>
      <div className='container'>
        {/* 章节标题 */}
        <FadeInUp className='mb-16 text-center' delay={0.1}>
          <h2 className='mb-6 text-center text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl'>
            三大核心优势驱动高效落地
          </h2>
        </FadeInUp>

        {/* 核心优势展示 - 三栏卡片布局 */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: '-20px' }}
              className='group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl'
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* 渐变背景装饰 */}
              <div className='absolute inset-0 bg-gradient-to-br from-primary-50/30 to-accent-50/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              
              {/* 内容区域 */}
              <div className='relative z-10'>
                {/* 序号标识 */}
                <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-lg font-bold text-white'>
                  {index + 1}
                </div>
                
                {/* 标题 */}
                <h3 className='mb-4 text-xl font-bold text-gray-900 lg:text-2xl'>
                  {advantage.title}
                </h3>
                
                {/* 描述 */}
                <p className='leading-relaxed text-gray-600'>{advantage.description}</p>
                
                {/* 悬停装饰线 */}
                <div className='mt-6 h-1 w-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full' />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className='mt-16 text-center'
        >
          
        </motion.div>
      </div>
    </section>
  )
}