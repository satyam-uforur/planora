"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-background min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className="space-y-8"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span className="text-xs font-bold text-muted-foreground tracking-widest">NEXT-GEN EVENT PLANNING</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Plan Your Perfect Event.
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Connect with premium event organizers for birthdays, weddings, baby showers, and celebrations. Create
              unforgettable moments effortlessly.
            </p>

            <Link href="/book">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8">
                Book Event
                <ChevronRight className="ml-2" size={18} />
              </Button>
            </Link>

            <div
              className="flex items-center gap-6 pt-8"
              style={{
                transform: `translateY(${scrollY * -0.2}px)`,
              }}
            >
              <div className="w-12 h-12 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                <span className="text-sm font-semibold text-muted-foreground">01</span>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-widest">EXPLORE NOW</p>
                <p className="text-sm text-foreground font-medium">All Features</p>
              </div>
            </div>
          </div>

          <div
            className="relative h-96 md:h-[500px] hidden md:flex items-center justify-center"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden flex items-center justify-center">
              <img
                src="/event-planning-illustration-with-phone-organizer.jpg"
                alt="Event planning illustration"
                className="w-full h-full object-cover"
              />

              <div
                className="absolute top-8 right-8 w-20 h-20 bg-yellow-300 rounded-2xl shadow-lg"
                style={{
                  transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.3}px)`,
                }}
              ></div>
              <div
                className="absolute bottom-16 left-8 w-16 h-16 bg-teal-300 rounded-full shadow-lg"
                style={{
                  transform: `translate(${-scrollY * 0.2}px, ${scrollY * 0.2}px)`,
                }}
              ></div>
              <div
                className="absolute top-1/2 right-12 w-12 h-12 bg-red-400 rounded-lg shadow-lg"
                style={{
                  transform: `translate(${scrollY * 0.15}px, ${-scrollY * 0.3}px)`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
