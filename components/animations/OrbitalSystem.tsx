'use client'

import {FC, useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  delay: number
}

interface Orbit {
  id: number
  radiusX: number
  radiusY: number
  rotation: number
  opacity: number
  particles: Particle[]
}

const OrbitalSystem: FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [orbits, setOrbits] = useState<Orbit[]>([])

  useEffect(() => {
    // Generate random orbits and particles
    const generateOrbits = () => {
      const newOrbits: Orbit[] = []

      for (let i = 0; i < 5; i++) {
        const particles: Particle[] = []
        const particleCount = Math.floor(Math.random() * 8) + 4

        for (let j = 0; j < particleCount; j++) {
          particles.push({
            id: j,
            x: 0,
            y: 0,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 20 + 10,
            delay: Math.random() * 10,
          })
        }

        newOrbits.push({
          id: i,
          radiusX: Math.random() * 200 + 100,
          radiusY: Math.random() * 100 + 50,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.3 + 0.1,
          particles,
        })
      }

      setOrbits(newOrbits)
    }

    generateOrbits()
  }, [])

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      <svg
        ref={svgRef}
        className='absolute inset-0 w-full h-full'
        viewBox='0 0 1000 1000'
        preserveAspectRatio='xMidYMid slice'>
        <defs>
          <filter id='glow'>
            <feGaussianBlur stdDeviation='3' result='coloredBlur' />
            <feMerge>
              <feMergeNode in='coloredBlur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        {orbits.map(orbit => (
          <g key={orbit.id} transform={`translate(500, 500) rotate(${orbit.rotation})`}>
            {/* Orbit path */}
            <ellipse
              cx='0'
              cy='0'
              rx={orbit.radiusX}
              ry={orbit.radiusY}
              fill='none'
              stroke='rgba(255, 255, 255, 0.2)'
              strokeWidth='1'
              strokeDasharray='5,10'
              opacity={orbit.opacity}
            />

            {/* Particles along orbit */}
            {orbit.particles.map((particle, index) => {
              const angle = (index / orbit.particles.length) * 2 * Math.PI
              const x = Math.cos(angle) * orbit.radiusX
              const y = Math.sin(angle) * orbit.radiusY

              return (
                <motion.circle
                  key={particle.id}
                  cx={x}
                  cy={y}
                  r={particle.size}
                  fill='rgba(255, 255, 255, 0.8)'
                  opacity={particle.opacity}
                  filter='url(#glow)'
                  animate={{
                    cx: [
                      Math.cos(angle) * orbit.radiusX,
                      Math.cos(angle + Math.PI) * orbit.radiusX,
                      Math.cos(angle + 2 * Math.PI) * orbit.radiusX,
                    ],
                    cy: [
                      Math.sin(angle) * orbit.radiusY,
                      Math.sin(angle + Math.PI) * orbit.radiusY,
                      Math.sin(angle + 2 * Math.PI) * orbit.radiusY,
                    ],
                  }}
                  transition={{
                    duration: particle.speed,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: particle.delay,
                  }}
                />
              )
            })}
          </g>
        ))}

        {/* Central glow effect */}
        <circle cx='500' cy='500' r='100' fill='rgba(0, 255, 255, 0.1)' filter='url(#glow)'>
          <animate attributeName='r' values='100;120;100' dur='4s' repeatCount='indefinite' />
          <animate attributeName='opacity' values='0.1;0.2;0.1' dur='4s' repeatCount='indefinite' />
        </circle>
      </svg>
    </div>
  )
}

export default OrbitalSystem
