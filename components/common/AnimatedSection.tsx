'use client'

import { ReactNode, memo } from 'react'
import { motion } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  margin?: string
}

const AnimatedSection = memo(function AnimatedSection({
  children,
  className = '',
  delay = 0,
  margin = '-50px',
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin }}
      className={className}
    >
      {children}
    </motion.div>
  )
})

export default AnimatedSection
