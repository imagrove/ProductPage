import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SuccessMessageProps {
  message: string
  subMessage?: string
  duration?: number
  onClose?: () => void
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  subMessage,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onClose?.()
      }, 500)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className='fixed left-1/2 top-1/2 z-50 max-w-sm -translate-x-1/2
                     -translate-y-1/2 transform rounded-lg bg-green-500 px-6 py-4 text-center
                     text-white shadow-2xl'
        >
          <h3 className='mb-2 text-lg font-semibold'>{message}</h3>
          {subMessage && <p className='text-sm opacity-90'>{subMessage}</p>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
