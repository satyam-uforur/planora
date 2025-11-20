"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section
      className="
        py-24 px-4 sm:px-6 lg:px-8
        text-white
        relative overflow-hidden
        bg-gradient-to-br from-[#0077ff] via-[#0a84ff] to-[#4db8ff]
      "
    >
      {/* Glossy Shine Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),rgba(255,255,255,0)_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Ready to Plan Your Event?
        </h2>

        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Join thousands of happy customers who have created unforgettable events with Planora
        </p>

        <Link href="/book">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-8"
          >
            Start Booking
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </Link>
      </div>
    </section>
  )
}
