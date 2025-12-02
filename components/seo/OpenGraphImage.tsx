'use client'

import { useEffect, useRef } from 'react'

interface OpenGraphImageProps {
  title: string
  description: string
}

export default function OpenGraphImage({ title, description }: OpenGraphImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸（Open Graph推荐尺寸）
    canvas.width = 1200
    canvas.height = 630

    // 绘制背景
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630)
    gradient.addColorStop(0, '#0ea5e9')
    gradient.addColorStop(1, '#0369a1')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1200, 630)

    // 绘制标题
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 64px "Poppins", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(title, 600, 280)

    // 绘制描述
    ctx.font = '32px "Inter", sans-serif'
    ctx.fillStyle = '#f0f9ff'
    ctx.fillText(description, 600, 380)

    // 绘制Logo
    ctx.font = 'bold 48px "Poppins", sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText('多媒体播控系统', 600, 500)
  }, [title, description])

  return (
    <div style={{ display: 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
