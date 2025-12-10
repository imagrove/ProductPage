'use client'

import { motion } from 'framer-motion'
import { 
  GlobeIcon, LinkIcon, ChartIcon, ClockIcon, LockIcon, CheckCircleIcon,
  CloudIcon, MobileIcon, DesktopIcon, LaptopIcon, PlugIcon
} from '@/components/ui/MinimalIcons'

// 解决方案数据
const solutionFeatures = [
  {
    title: '分布式群组控制',
    description: '独立群组可在无外网环境下稳定运行，支持 16K×8K 超高清分辨率',
    icon: <GlobeIcon className="h-6 w-6" />,
    features: ['无外网独立运行', '16K×8K超高清', '多群组协同控制'],
  },
  {
    title: '多协议兼容',
    description:
      '支持市场上 90%以上主流型号投影机、电脑主机快捷键、多媒体播放器，以及照明灯光/舞台灯/氛围灯等多种设备的控制协议',
    icon: <LinkIcon className="h-6 w-6" />,
    features: ['90%+设备兼容', '多种控制协议', '无缝设备集成'],
  },
  {
    title: '云端+本地双重保障',
    description: '物联网集中控制平台，支持远程监控和本地独立运行',
    icon: <CloudIcon className="h-6 w-6" />,
    features: ['远程监控管理', '本地独立运行', '双重保障机制'],
  },
  {
    title: '多端发起控制',
    description: '支持讲解员/工作人员通过手持平板电脑、游客通过壁装触控面板发起控制',
    icon: <MobileIcon className="h-6 w-6" />,
    features: ['平板电脑控制', '壁装触控面板', '多终端协同'],
  },
]

// 关键功能数据
const keyFunctions = [
  {
    title: '多屏联动技术',
    description: '多设备同步控制、分布式画面融合、边缘融合技术',
    icon: <DesktopIcon className="h-6 w-6" />,
  },
  {
    title: '远程管控系统',
    description: '平板电脑 APP 远程监控和控制多个群组，实时查看设备状态',
    icon: <ChartIcon className="h-6 w-6" />,
  },
  {
    title: '定时播控',
    description: '预设多种展览场景，一键触发相关设备的联动控制',
    icon: <ClockIcon className="h-6 w-6" />,
  },
  {
    title: '权限管理',
    description: '基于角色的多级权限控制系统，确保系统安全和管理规范',
    icon: <LockIcon className="h-6 w-6" />,
  },
  {
    title: '硬件兼容',
    description: '支持投影仪、电脑主机、音频设备、灯光设备、播放器等多种设备类型',
    icon: <LaptopIcon className="h-6 w-6" />,
  },
  {
    title: '接口对接',
    description: '可对接企业微信、钉钉等平台实现告警推送',
    icon: <PlugIcon className="h-6 w-6" />,
  },
]

export default function Solution() {
  return (
    <section className='py-28 lg:py-36 bg-white'>
      <div className='container'>
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className='mb-24 text-center'
        >
          <h2 className='mb-6 text-center text-4xl font-bold text-gray-800 sm:text-5xl lg:text-6xl'>
            全场景多媒体播控系统定制方案
          </h2>
        </motion.div>

        {/* 核心架构展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, margin: '-30px' }}
          className='mb-20'
        >
          <h3 className='mb-12 text-center text-2xl font-bold text-gray-800 lg:text-3xl'>
            核心架构
          </h3>

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3'>
            {solutionFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: '-20px' }}
                className='group transform rounded-xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg lg:p-10'
                whileHover={{ y: -2, scale: 1.02 }}
              >
                {/* 图标和标题 */}
                <div className='mb-6 flex items-center'>
                  <div className='mr-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 transition-transform duration-300 group-hover:scale-110'>
                    {feature.icon}
                  </div>
                  <h4 className='text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-primary-600'>
                    {feature.title}
                  </h4>
                </div>

                {/* 描述 */}
                <p className='mb-4 leading-relaxed font-normal text-gray-600'>{feature.description}</p>

                {/* 特性列表 */}
                <div className='space-y-2'>
                  {feature.features.map(item => (
                    <div key={item} className='flex items-center text-sm text-primary-600'>
                      <CheckCircleIcon className='mr-2 h-4 w-4' color='currentColor' />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 关键功能 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true, margin: '-30px' }}
        >
          <h3 className='mb-12 text-center text-2xl font-bold text-gray-800 lg:text-3xl'>
            关键功能
          </h3>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {keyFunctions.map((func, index) => (
              <motion.div
                key={func.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: '-20px' }}
                className='rounded-xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg'
              >
                <div className='flex items-start'>
                  <div className='mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50'>
                    {func.icon}
                  </div>
                  <div>
                    <h4 className='mb-3 text-xl font-semibold text-gray-800'>{func.title}</h4>
                    <p className='text-base leading-relaxed text-gray-600'>{func.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
