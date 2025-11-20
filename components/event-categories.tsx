"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Cake, Baby, Gift, Users, Music } from "lucide-react"

const categories = [
  { icon: Heart, name: "Weddings", color: "bg-pink-100" },
  { icon: Cake, name: "Birthdays", color: "bg-blue-100" },
  { icon: Baby, name: "Baby Showers", color: "bg-yellow-100" },
  { icon: Gift, name: "Corporate", color: "bg-purple-100" },
  { icon: Users, name: "Family Events", color: "bg-green-100" },
  { icon: Music, name: "Parties", color: "bg-red-100" },
]

export default function EventCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Categories</h2>
          <p className="text-muted-foreground max-w-2xl">Browse our range of professional event planning services</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => {
            const Icon = category.icon
            return (
              <Link href="/book" key={category.name}>
                <div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 ${
                    hoveredIndex === idx ? `${category.color} shadow-lg scale-105` : "bg-muted/40 hover:bg-muted/60"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${category.color} transition-transform duration-300 ${hoveredIndex === idx ? "scale-110" : ""}`}
                  >
                    <Icon size={24} className="text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{category.name}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
