'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeInUpProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  margin?: string
  once?: boolean
}

export const FadeInUp = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  margin = '-50px',
  once = true,
}: FadeInUpProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once, margin }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
