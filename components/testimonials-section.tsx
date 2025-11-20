"use client"
import { Star } from "lucide-react"
import { MarqueeDemo } from "@/components/marquee-reviews"

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Planora made our wedding planning stress-free! The organizer was professional and attentive to every detail.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    text: "Best birthday party ever! The team handled everything perfectly and the guests loved it.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    text: "Such a beautiful and well-organized baby shower. Highly recommend Planora!",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Our Clients</h2>
          <p className="text-muted-foreground">Read what people say about their Planora experience</p>
        </div>

        
          <MarqueeDemo />
       
      </div>
    </section>
  )
}
