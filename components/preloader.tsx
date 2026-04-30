"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Preloader() {
  const [loading, setLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Progress increment animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 5) + 1
      })
    }, 80)

    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 800)
    }, 2800)

    // Canvas Network Animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const particleCount = 40
    const connectionDistance = 150

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx!.fillStyle = "rgba(56, 189, 248, 0.5)"
        ctx!.fill()
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = Array.from({ length: particleCount }, () => new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((p, i) => {
        p.update()
        p.draw()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / connectionDistance})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)
    resize()
    animate()

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (!loading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-all duration-800 ease-in-out",
        "bg-gradient-to-br from-[#0b1d2a] to-[#08131f]",
        fadeOut ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
      )}
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative group transition-transform duration-1000 ease-out hover:scale-105">
          {/* Logo Glow */}
          <div className="absolute inset-0 bg-sky-500/20 blur-[60px] rounded-full animate-pulse scale-150" />
          
          {/* ISI Logo */}
          <div className="relative transition-all duration-1000 animate-in fade-in zoom-in slide-in-from-bottom-4">
            <Image
              src="/logo-blue.png"
              alt="Logo ISI"
              width={300}
              height={150}
              className="w-64 h-auto brightness-0 invert filter drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              priority
            />
          </div>
        </div>

        {/* Loading Information */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <span className="text-sky-400 font-mono text-sm tracking-widest uppercase opacity-80">
              Bienvenue dans ISI
              <span className="inline-flex w-8 ml-1">
                <span className="animate-[bounce_1.5s_infinite] delay-0">.</span>
                <span className="animate-[bounce_1.5s_infinite] delay-150">.</span>
                <span className="animate-[bounce_1.5s_infinite] delay-300">.</span>
              </span>
            </span>
            <span className="text-white font-mono text-xs opacity-40">|</span>
            <span className="text-white font-mono text-sm min-w-[3ch]">
              {progress}%
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-sky-400 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
    </div>
  )
}
