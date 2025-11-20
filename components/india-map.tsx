"use client"

import { useState } from "react"

interface City {
  name: string
  lat: number
  lng: number
  coordinates: { x: number; y: number }
}

const cities: City[] = [
  { name: "Surat", lat: 21.1702, lng: 72.8311, coordinates: { x: 65, y: 55 } },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, coordinates: { x: 60, y: 45 } },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, coordinates: { x: 55, y: 70 } },
  { name: "Delhi", lat: 28.7041, lng: 77.1025, coordinates: { x: 75, y: 10 } },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639, coordinates: { x: 90, y: 50 } },
  { name: "Varanasi", lat: 25.3268, lng: 82.9842, coordinates: { x: 85, y: 35 } },
]

export function IndiaMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 flex items-center justify-center relative overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-8"
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
        }}
      >
        {/* India map outline - simplified */}
        <path
          d="M 25 15 L 85 15 L 85 25 L 75 35 L 78 50 L 85 60 L 80 75 L 50 85 L 30 75 L 20 60 L 15 45 L 18 30 Z"
          fill="#e0f2fe"
          stroke="#0369a1"
          strokeWidth="0.5"
        />

        {/* State grid lines */}
        <g stroke="#7dd3fc" strokeWidth="0.2" opacity="0.5">
          <line x1="25" y1="35" x2="85" y2="35" />
          <line x1="25" y1="55" x2="85" y2="55" />
          <line x1="45" y1="15" x2="40" y2="85" />
          <line x1="65" y1="15" x2="70" y2="85" />
        </g>

        {/* Cities */}
        {cities.map((city) => (
          <g key={city.name}>
            <circle
              cx={city.coordinates.x}
              cy={city.coordinates.y}
              r={hoveredCity === city.name ? 3 : 2}
              fill={hoveredCity === city.name ? "#dc2626" : "#0369a1"}
              className="transition-all cursor-pointer"
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
            />

            {/* Glow effect for hovered city */}
            {hoveredCity === city.name && (
              <circle
                cx={city.coordinates.x}
                cy={city.coordinates.y}
                r={6}
                fill="none"
                stroke="#dc2626"
                strokeWidth="0.5"
                opacity="0.3"
              />
            )}

            {/* City label on hover */}
            {hoveredCity === city.name && (
              <>
                <rect
                  x={city.coordinates.x - 8}
                  y={city.coordinates.y - 6}
                  width="16"
                  height="5"
                  fill="#dc2626"
                  rx="1"
                />
                <text
                  x={city.coordinates.x}
                  y={city.coordinates.y - 2}
                  fontSize="2.5"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {city.name}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h3 className="text-2xl font-bold text-slate-800">Branches Across India</h3>
        <p className="text-sm text-slate-600 mt-1">Serving {cities.length} major cities</p>
      </div>
    </div>
  )
}
