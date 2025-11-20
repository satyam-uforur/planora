"use client"

import { ArrowRight } from "lucide-react"

const features = [
  {
    number: "01",
    title: "Browse Events",
    description: "Explore our curated collection of event types and professional organizers",
  },
  {
    number: "02",
    title: "Choose Organizer",
    description: "Select from verified event planners matched to your specific needs",
  },
  {
    number: "03",
    title: "Book & Celebrate",
    description: "Confirm your booking and let us handle all the details",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl">Planning your event is simple and straightforward</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={feature.number} className="space-y-4">
              <div className="text-5xl font-bold text-primary/20">{feature.number}</div>
              <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

              {idx < features.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="text-primary/40" size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
