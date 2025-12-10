'use client'

import { motion } from 'framer-motion'
import { TargetIcon, TrophyIcon, RocketIcon } from '@/components/ui/MinimalIcons'

// 核心优势数据
const advantages = [
  {
    title: '深度定制・精准匹配需求',
    description: '全流程一站式服务（需求→设计→落地→售后），支持硬件配置、功能模块、交互内容（H5/3D）全方位定制，灵活适配商用 / 工业级场景，打造专属解决方案。',
    icon: <TargetIcon className='h-6 w-6' color='white' />,
  },
  {
    title: '十年积淀・高效交付保障',
    description: '服务数字展馆、博物馆等多行业，完成多个大型项目落地，成熟三方合作模式 + 短周期集成能力，确保项目按时高质量交付。',
    icon: <TrophyIcon className='h-6 w-6' color='white' />,
  },
  {
    title: '技术硬核・稳定可靠运行',
    description: 'Linux 嵌入式架构 + WebGL 硬件加速，支持无外网独立运行，多重安全机制 + 7×24 小时技术支持，保障长期稳定无故障。',
    icon: <RocketIcon className='h-6 w-6' color='white' />,
  },
]

export default function Advantages() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="container">
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="mb-6 text-center text-4xl font-bold text-gray-800 sm:text-5xl lg:text-6xl">
            三大核心优势
          </h2>
        </motion.div>

        {/* 核心优势展示 - 三栏卡片布局 */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-20px' }}
              className='group relative overflow-hidden rounded-xl bg-white p-10 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200'
              whileHover={{ y: -2, scale: 1.02 }}
            >
              {/* 渐变背景装饰 */}
              <div className='absolute inset-0 bg-primary-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              
              {/* 内容区域 */}
              <div className='relative z-10'>
                {/* 图标标识 */}
                <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-600 text-2xl font-bold text-white'>
                  {advantage.icon}
                </div>
                
                {/* 标题 */}
                <h3 className='mb-6 text-2xl font-bold text-gray-800 lg:text-3xl'>
                  {advantage.title}
                </h3>
                
                {/* 描述 */}
                <p className='leading-relaxed text-gray-600 text-lg'>{advantage.description}</p>
                
                {/* 悬停装饰线 */}
                <div className='mt-8 h-1 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}