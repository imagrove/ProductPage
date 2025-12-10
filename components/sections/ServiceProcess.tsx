'use client'

import { motion } from 'framer-motion'
import { useScrollToSection } from '@/hooks'

// 服务流程数据
const serviceProcess = [
  {
    step: 1,
    title: '需求分析',
    icon: '🔍',
    details: ['深入了解项目需求和现场环境', '分析设备兼容性和技术可行性', '制定初步技术方案和预算']
  },
  {
    step: 2,
    title: '方案设计',
    icon: '📋',
    details: ['技术方案设计', '系统架构规划', '界面原型设计', '硬件配置方案']
  },
  {
    step: 3,
    title: '部署实施',
    icon: '🚀',
    details: ['系统部署实施', '技术文档交付', '运维团队培训', '系统测试验收']
  },
  {
    step: 4,
    title: '售后支持',
    icon: '🛡️',
    details: ['7×24小时技术支持', '定期系统维护', '远程监控管理', '故障预警处理']
  },
]

export default function ServiceProcess() {
  const { scrollToSection } = useScrollToSection()

  return (
    <section className='py-24 lg:py-32'>
      <div className='container'>
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className='mb-20 text-center'
        >
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl'>
            专业定制服务全流程
          </h2>
          
        </motion.div>

        {/* 服务流程时间线 */}
        <div className='relative'>
          {/* 时间线 - 只在桌面端显示 */}
          <div className='absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform bg-gradient-to-b from-primary-500 to-secondary-500 lg:block' style={{ zIndex: 0 }}></div>

          <div className='space-y-12 lg:space-y-16' style={{ position: 'relative', zIndex: 10 }}>
            {serviceProcess.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                {/* 流程步骤标识 */}
                <div className='flex justify-center lg:w-1/3 lg:justify-start'>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className='relative'>
                    <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-3xl font-bold text-white shadow-lg lg:h-28 lg:w-28 lg:text-4xl'>
                      {process.icon}
                    </div>

                    {/* 步骤编号 */}
                    <div className='absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-500 bg-white text-sm font-bold text-primary-600'>
                      {process.step}
                    </div>

                    {/* 时间线节点 - 只在桌面端显示 */}
                    <div className='absolute left-1/2 hidden h-4 w-4 -translate-x-1/2 transform rounded-full border-4 border-white bg-primary-500 shadow-lg lg:block'></div>
                  </motion.div>
                </div>

                {/* 流程内容 */}
                <div className='w-full lg:w-2/3'>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                    viewport={{ once: true }}
                    className='w-full max-w-md mx-auto transform rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all transition-all duration-300 duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8 lg:max-w-none lg:mx-0'
                  >
                    <div className='mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                      <h3 className='mb-2 text-xl font-bold text-gray-900 lg:mb-0 lg:text-2xl'>
                        {process.title}
                      </h3>
                    </div>

                    {/* 详细步骤 */}
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                      {process.details.map((detail, detailIndex) => (
                        <div key={detail} className='flex items-center text-sm text-gray-700'>
                          <svg
                            className='mr-2 h-4 w-4 text-primary-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}