'use client'

import { motion } from 'framer-motion'
import { useScrollToSection } from '@/hooks'
import { SearchIcon, DocumentIcon, RocketIcon, ShieldIcon, CheckCircleIcon } from '@/components/ui/MinimalIcons'

// 服务流程数据
const serviceProcess = [
  {
    step: 1,
    title: '需求分析',
    icon: <SearchIcon className='h-8 w-8' color='white' />,
    details: ['深入了解项目需求和现场环境', '分析设备兼容性和技术可行性', '制定初步技术方案和预算']
  },
  {
    step: 2,
    title: '方案设计',
    icon: <DocumentIcon className='h-8 w-8' color='white' />,
    details: ['技术方案设计', '系统架构规划', '界面原型设计', '硬件配置方案']
  },
  {
    step: 3,
    title: '部署实施',
    icon: <RocketIcon className='h-8 w-8' color='white' />,
    details: ['系统部署实施', '技术文档交付', '运维团队培训', '系统测试验收']
  },
  {
    step: 4,
    title: '售后支持',
    icon: <ShieldIcon className='h-8 w-8' color='white' />,
    details: ['7×24小时技术支持', '定期系统维护', '远程监控管理', '故障预警处理']
  },
]

export default function ServiceProcess() {
  const { scrollToSection } = useScrollToSection()

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
                          <CheckCircleIcon className='mr-2 h-4 w-4 text-primary-500' />
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