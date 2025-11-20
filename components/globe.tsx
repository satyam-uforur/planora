"use client"

import { useRef, useEffect } from "react"

export function Globe({ className = "", points = [] }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let rotation = 0
    const radius = Math.min(canvas.width, canvas.height) / 2.1
    const cx = canvas.width / 2
    const cy = canvas.height / 2

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Base Globe
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = "#0B1C4D"
      ctx.fill()

      // Points Rendering
      points.forEach((p) => {
        const x = cx + radius * Math.cos((p.lng + rotation) * 0.017)
        const y = cy - radius * Math.sin(p.lat * 0.017)

        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fillStyle = p.color || "#ff0000"
        ctx.fill()
      })

      rotation += 0.6
      requestAnimationFrame(draw)
    }

    draw()
  }, [points])

  return (
    <canvas ref={canvasRef} className={`absolute w-[350px] h-[350px] ${className}`} />
  )
}
