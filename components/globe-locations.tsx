"use client"

import { useRef, useEffect } from "react"

export function GlobeDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let rotation = 0
    const radius = Math.min(canvas.width, canvas.height) / 2.3
    const cx = canvas.width / 2
    const cy = canvas.height / 2

    // City markers
    const cities = [
      { name: "Mumbai", lat: 19.076, lon: 72.877, color: "#ff4d4d" },
      { name: "Delhi", lat: 28.7041, lon: 77.1025, color: "#3b82f6" },
      { name: "Bangalore", lat: 12.9716, lon: 77.5946, color: "#22c55e" },
      { name: "London", lat: 51.5074, lon: -0.1278, color: "#f97316" },
      { name: "New York", lat: 40.7128, lon: -74.006, color: "#a855f7" }
    ]

    // Load soft world-map texture inside the globe
    const img = new Image()
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background globe
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = "#0a1a3b"
      ctx.fill()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()

      // Move + rotate the image
      const imgWidth = 1000
      const imgHeight = 500

      const offsetX = -(rotation % imgWidth)

      ctx.drawImage(img, offsetX, cy - imgHeight / 2, imgWidth, imgHeight)
      ctx.drawImage(img, offsetX + imgWidth, cy - imgHeight / 2, imgWidth, imgHeight)

      ctx.restore()

      // Glow border
      ctx.strokeStyle = "rgba(255,255,255,0.25)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw city points
      cities.forEach((c) => {
        const x = cx + Math.cos(rotation / 60 + c.lon) * radius * 0.75
        const y = cy + Math.sin(c.lat) * radius * 0.45

        ctx.beginPath()
        ctx.fillStyle = c.color
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()
      })

      rotation += 1.5
      requestAnimationFrame(draw)
    }

    img.onload = draw
  }, [])

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full max-w-xl" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
            Branches Across India
          </h3>
          <p className="text-gray-300">Serving 5+ major cities worldwide</p>
        </div>
      </div>
    </div>
  )
}
