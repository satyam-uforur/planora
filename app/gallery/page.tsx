"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const galleryItems = [
  { id: 1, type: "Wedding", title: "Elegant Garden Wedding", image: "/wedding-ceremony.jpg" },
  { id: 2, type: "Birthday", title: "Colorful Birthday Bash", image: "/birthday-party-decorations.jpg" },
  { id: 3, type: "Baby Shower", title: "Pastel Baby Shower", image: "/baby-shower-setup.jpg" },
  { id: 4, type: "Corporate", title: "Corporate Gala", image: "/corporate-event.jpg" },
  { id: 5, type: "Wedding", title: "Beach Wedding", image: "/beach-wedding.jpg" },
  { id: 6, type: "Party", title: "Festive Party Night", image: "/party-celebration.jpg" },
]

export default function Gallery() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? galleryItems : galleryItems.filter((item) => item.type === filter)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Event Gallery</h1>
            <p className="text-muted-foreground text-lg">Explore beautiful events organized by Planora</p>
          </div>

          <div className="flex gap-3 mb-12 flex-wrap">
            {["All", "Wedding", "Birthday", "Baby Shower", "Corporate", "Party"].map((cat) => (
              <Button key={cat} variant={filter === cat ? "default" : "outline"} onClick={() => setFilter(cat)}>
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Card key={item.id} className="card-hover overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {item.type}
                  </span>
                  <h3 className="text-lg font-bold mt-2">{item.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
