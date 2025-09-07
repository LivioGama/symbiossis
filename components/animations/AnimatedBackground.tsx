'use client'

import {motion} from 'framer-motion'
import {FC, useEffect, useRef} from 'react'

const AnimatedBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2,
      )

      gradient.addColorStop(0, 'rgba(160, 228, 255, 0.3)')
      gradient.addColorStop(0.5, 'rgba(80, 200, 255, 0.2)')
      gradient.addColorStop(1, 'rgba(0, 150, 255, 0.1)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add floating particles
      const time = Date.now() * 0.001
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        const x = Math.sin(time + i) * 200 + canvas.width / 2 + i * 20
        const y = Math.cos(time + i * 0.5) * 150 + canvas.height / 2 + i * 10
        const size = Math.sin(time + i) * 2 + 3
        const opacity = Math.sin(time + i * 0.3) * 0.5 + 0.5

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(x, y, size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.1})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className='absolute inset-0 pointer-events-none'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
    />
  )
}

export default AnimatedBackground
