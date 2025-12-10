'use client'

import { motion } from 'framer-motion'

// 成功案例数据
const caseStudies = [
  {
    title: '数字展馆多媒体控制系统项目',
    description: '为3000㎡大型数字展馆提供定制化多群组控制系统，支持投影、灯光、音响一体化控制',
    image: '/images/case-1.jpg',
    stats: {
      scale: '3000㎡ 展馆',
      exhibits: '20+ 展项',
      nodes: '50+ 控制节点',
      duration: '2年+ 稳定运行',
    },
    results: [
      '系统稳定运行 2 年+，零故障',
      '客户满意度 100%'
    ],
    technologies: ['分布式控制', '多屏联动', '远程管理', '定时播控'],
  },
  {
    title: '企业展厅智能交互系统',
    description: '为1000㎡企业展厅定制开发交互式播控系统，支持触摸控制、手势识别、移动端控制',
    image: '/images/case-2.jpg',
    stats: {
      scale: '1000㎡ 展厅',
      exhibits: '15+ 互动展项',
      nodes: '30+ 控制节点',
      duration: '18个月 稳定运行',
    },
    results: ['提升参观体验 30%', '减少运维成本 40%', ],
    technologies: ['触摸控制', '手势识别', '移动端控制', '智能交互'],
  },
  {
    title: '博物馆多媒体展示系统',
    description: '为8000㎡博物馆定制开发多媒体播控系统，支持多屏联动、定时播控、远程管理',
    image: '/images/case-3.jpg',
    stats: {
      scale: '8000㎡ 博物馆',
      exhibits: '30+ 展项',
      nodes: '80+ 控制节点',
      duration: '3年+ 稳定运行',
    },
    results: ['系统稳定运行 3 年+', '故障率低于 0.1%'],
    technologies: ['多屏联动', '定时播控', '远程管理', '权限控制'],
  },
]

export default function CaseStudies() {
  return (
    <section className='py-24 lg:py-32'>
      <div className='container'>
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: '-30px' }}
          className='mb-20 text-center'
        >
          <h2 className='mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl'>
            成功案例
          </h2>
          
        </motion.div>

        {/* 成功案例展示 */}
        <div className='space-y-12 lg:space-y-16'>
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-30px' }}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-12 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              whileHover={{ scale: 1.01 }}
            >
              {/* 案例图片区域 */}
              <div className='w-full lg:w-1/2'>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className='relative overflow-hidden rounded-2xl shadow-xl'
                >
                  {/* 图片占位符 */}
                  <div className='flex h-64 w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 lg:h-80'>
                    <div className='text-center text-gray-500'>
                      <div className='mb-2 text-4xl'>🏛️</div>
                      <div className='text-sm'>案例展示图片</div>
                      <div className='mt-1 text-xs'>1200x800px 灰色占位图</div>
                    </div>
                  </div>

                  {/* 技术标签 */}
                  <div className='absolute bottom-4 left-4 right-4 flex flex-wrap gap-2'>
                    {caseStudy.technologies.map(tech => (
                      <span
                        key={tech}
                        className='rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary-600 backdrop-blur-sm'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* 案例内容区域 */}
              <div className='lg:w-1/2'>
                <div>
                  <h3 className='mb-4 text-2xl font-bold text-gray-900 lg:text-3xl'>
                    {caseStudy.title}
                  </h3>

                  <p className='mb-6 leading-relaxed text-gray-600'>{caseStudy.description}</p>

                  {/* 项目统计 */}
                  <div className='mb-6 grid grid-cols-2 gap-4'>
                    {Object.entries(caseStudy.stats).map(([key, value]) => (
                      <div key={key} className='rounded-lg bg-gray-50 p-3 text-center'>
                        <div className='text-lg font-semibold text-primary-600'>{value}</div>
                        <div className='text-xs capitalize text-gray-500'>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 项目成果 */}
                  <div className='mb-6'>
                    <h4 className='mb-3 font-semibold text-gray-900'>项目成果：</h4>
                    <div className='space-y-2'>
                      {caseStudy.results.map((result, resultIndex) => (
                        <div key={resultIndex} className='flex items-center text-sm text-gray-700'>
                          <svg
                            className='mr-2 h-4 w-4 text-green-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
