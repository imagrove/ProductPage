'use client'

import { motion } from 'framer-motion'
import { useScrollToTop } from '@/hooks'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { scrollToTop } = useScrollToTop()

  // 公司信息
  const companyInfo = {
    name: '智能多媒体控制系统',
    description: '专业提供多媒体设备集中控制解决方案，10年+行业经验，100+成功案例',
    address: '北京市朝阳区科技园区',
    phone: '400-123-4567',
    email: 'contact@example.com',
  }

  // 服务项目
  const services = [
    '数字展馆控制',
    '企业展厅控制',
    '博物馆控制',
    '商业中心控制',
    '教育机构控制',
    '定制化开发',
  ]

  // 技术能力
  const technologies = [
    '分布式群组控制',
    '定时播控管理',
    '远程监控管理',
    '多设备兼容',
    '模块化架构',
    'API接口开发',
  ]

  // 快速链接
  const quickLinks = [
    { name: '首页', href: '#' },
    { name: '解决方案', href: '#solution' },
    { name: '核心优势', href: '#advantages' },
    { name: '成功案例', href: '#cases' },
    { name: '服务流程', href: '#process' },
    { name: '联系我们', href: '#contact' },
  ]

  return (
    <footer className='bg-gray-900 text-white'>
      {/* 主要页脚内容 */}
      <div className='container py-12 lg:py-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12'>
          {/* 服务项目 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className='mb-4 text-lg font-semibold'>服务项目</h4>
            <ul className='space-y-2'>
              {services.map((service, index) => (
                <li key={service}>
                  <motion.a
                    href='#'
                    className='text-gray-300 transition-colors duration-200 hover:text-white'
                    whileHover={{ x: 5 }}
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 技术能力 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className='mb-4 text-lg font-semibold'>技术能力</h4>
            <ul className='space-y-2'>
              {technologies.map((tech, index) => (
                <li key={tech}>
                  <motion.a
                    href='#'
                    className='text-gray-300 transition-colors duration-200 hover:text-white'
                    whileHover={{ x: 5 }}
                  >
                    {tech}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 快速链接 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className='mb-4 text-lg font-semibold'>快速链接</h4>
            <ul className='space-y-2'>
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className='text-gray-300 transition-colors duration-200 hover:text-white'
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className='border-t border-gray-800'>
        <div className='container py-6'>
          <div className='flex items-center justify-center'>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='text-sm text-gray-400'
            >
              © {currentYear} {companyInfo.name}. 保留所有权利.
            </motion.p>
          </div>
        </div>
      </div>

      {/* 回到顶部按钮 */}
      <motion.button
        onClick={() => scrollToTop()}
        className='fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-primary-500 text-white shadow-lg transition-colors duration-200 hover:bg-primary-600'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className='mx-auto h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
        </svg>
      </motion.button>
    </footer>
  )
}
