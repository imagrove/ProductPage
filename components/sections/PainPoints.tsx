'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { LightbulbIcon, RocketIcon } from '../ui/MinimalIcons'

const painPoints = [
  { 
    id: 1, 
    title: '国外系统价格高、难定制', 
    description: '国外品牌系统价格高昂，定制化程度低，难以适应国内展馆特色需求',
    x: '4%',
    y: '18%',
    size: 'lg',
    color: 'from-primary-500 to-primary-700'
  },
  { 
    id: 2, 
    title: '国产系统硬件设计缺陷多', 
    description: '部分国产系统缺少壁装控制面板，移动终端控制不稳定，影响讲解员操作体验',
    x: '70%',
    y: '20%',
    size: 'lg',
    color: 'from-primary-600 to-primary-800'
  },
  { 
    id: 3, 
    title: '功能局限性大', 
    description: '传统系统无法满足现代展馆对交互性、沉浸式体验的需求',
    x: '-2%',
    y: '47%',
    size: 'md',
    color: 'from-primary-500 to-primary-700'
  },
  { 
    id: 4, 
    title: '部署周期长', 
    description: '需要复杂网络设置和专业人员，延误项目进度',
    x: '61%',
    y: '72%',
    size: 'md',
    color: 'from-primary-600 to-primary-800'
  },
  { 
    id: 5, 
    title: '维护成本高', 
    description: '系统故障频发，缺乏及时技术支持，影响展览正常进行',
    x: '71%',
    y: '50%',
    size: 'sm',
    color: 'from-gray-500 to-gray-700'
  },
  { 
    id: 6, 
    title: '扩展能力弱', 
    description: '无法根据展览需求变化灵活调整和扩展系统',
    x: '27%',
    y: '32%',
    size: 'sm',
    color: 'from-primary-400 to-primary-600'
  },
  { 
    id: 7, 
    title: '售后无保障', 
    description: '系统故障时缺乏及时的技术支持，影响展览正常进行',
    x: '48%',
    y: '27%',
    size: 'md',
    color: 'from-primary-500 to-primary-700'
  },
  { 
    id: 8, 
    title: '设备兼容性差', 
    description: '不同品牌设备无法统一控制，系统碎片化严重',
    x: '10%',
    y: '64%',
    size: 'sm',
    color: 'from-primary-600 to-primary-800'
  },
  { 
    id: 9, 
    title: '操作复杂难用', 
    description: '控制界面不友好，需要专业人员才能操作',
    x: '12%',
    y: '81%',
    size: 'sm',
    color: 'from-gray-500 to-gray-700'
  }
]

const sizeMap = {
  sm: 'w-52 h-52 text-base',
  md: 'w-60 h-60 text-lg',
  lg: 'w-68 h-68 text-xl'
}

export default function PainPoints() {
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  // 处理按钮点击，自动下滑到Solution section
  const handleExploreSolutions = () => {
    const solutionSection = document.getElementById('solution')
    if (solutionSection) {
      solutionSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
      <section className="pt-0 pb-32 bg-white relative overflow-hidden min-h-screen">
        {/* 中心主题节点 - 根据UI设计文档 */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl shadow-2xl flex items-center justify-center z-40 border-4 border-white/90 backdrop-blur-xl"
        initial={{ scale: 0, opacity: 0, rotateY: -180, x: '-50%', y: '-50%' }}
        whileInView={{ scale: 1, opacity: 1, rotateY: 0, x: '-50%', y: '-50%' }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.2
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 80px rgba(10, 36, 99, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.9)",
          background: "linear-gradient(135deg, #0A2463 0%, #3E7BFA 50%, #0A2463 100%)"
        }}
      >
        <div className="text-center px-8">
          <div className="mb-4 flex justify-center"><LightbulbIcon className="w-16 h-16 text-white" /></div>
          <span className="text-white font-black text-4xl leading-tight block drop-shadow-2xl">您是否面临这些挑战？</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-20">

        {/* 发散式思维气泡 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative min-h-[600px]"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.id}
              variants={bubbleVariants}
              whileHover={{ 
                scale: 1.1,
                zIndex: 20,
                transition: { type: 'spring', stiffness: 200 }
              }}
              className={`absolute ${sizeMap[point.size]} rounded-full p-6 flex flex-col items-center justify-center text-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-2xl backdrop-blur-sm border-2 border-white/30`}
              style={{ 
                left: point.x, 
                top: point.y,
                background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                zIndex: point.id
              }}
            >
              <div className={`bg-gradient-to-r ${point.color} w-full h-full rounded-full flex flex-col items-center justify-center p-4 text-white`}>
                <h3 className="font-bold mb-2 leading-tight">{point.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed font-normal">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 召唤按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-40"
        >
          <motion.button
            onClick={handleExploreSolutions}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-primary-700 hover:to-primary-800 hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RocketIcon className="w-5 h-5" /> 探索创新解决方案
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}