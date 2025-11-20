"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const generatedStars = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4,
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-background min-h-[calc(100vh-64px)] flex items-center overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: Math.max(0, star.opacity - scrollY / 1000),
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.8)`,
              transition: "opacity 0.3s ease-out",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-sm"></div>
              <span className="text-xs font-bold text-muted-foreground tracking-widest">NEXT-GEN EVENT PLANNING</span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance overflow-hidden"
              style={{
                transform: `translateX(${Math.max(-100, -scrollY * 0.6)}px)`,
              }}
            >
              Plan Your Perfect Event.
            </h1>

            <p
              className="text-base text-muted-foreground leading-relaxed max-w-md"
              style={{
                transform: `translateY(${scrollY * 0.1}px) translateX(${scrollY * 0.1}px)`,
                opacity: Math.min(1, 0.8 + scrollY / 1500),
              }}
            >
              Connect with premium event organizers for birthdays, weddings, baby showers, and celebrations. Create
              unforgettable moments effortlessly.
            </p>
             
           

            <Link href="/book">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8"
               
              style={{
                transform: `translateX(${scrollX * 0.1}px) translateY(${scrollY * 0.05}px)`
              }}>
                Book Event
                <ChevronRight className="ml-2" size={18} />
              </Button>
            </Link>

            <div
              className="flex items-center gap-6 pt-8"
              style={{
                transform: `translateX(${Math.max(0, scrollY * 0.5 - 100)}px)`,
                opacity: Math.min(1, Math.max(0, scrollY / 300)),
                transition: "all 0.3s ease-out",
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
            <div className="absolute inset-0 pointer-events-none">
              {/* Floating shapes with parallax - no background container */}
              <div
                className="absolute top-12 right-16 w-32 h-24 bg-gradient-to-br from-premium-accent to-premium-accent-dark rounded-3xl shadow-2xl"
                style={{
                  transform: `translate(${scrollY * 0.25}px, ${scrollY * 0.35}px) rotate(-15deg)`,
                  opacity: 0.95,
                }}
              ></div>

              <div
                className="absolute top-1/4 right-1/4 w-28 h-28 bg-gradient-to-br from-premium-rose to-premium-rose/70 rounded-full shadow-2xl"
                style={{
                  transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.3}px)`,
                  opacity: 0.9,
                }}
              ></div>

              <div
                className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-premium-teal to-premium-teal-dark rounded-full shadow-xl"
                style={{
                  transform: `translate(${-scrollY * 0.25}px, ${scrollY * 0.25}px)`,
                  opacity: 0.88,
                }}
              ></div>

              <div
                className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-br from-premium-navy to-premium-navy/80 rounded-2xl shadow-lg"
                style={{
                  transform: `translate(${scrollY * 0.15}px, ${-scrollY * 0.3}px) rotate(25deg)`,
                  opacity: 0.85,
                }}
              ></div>

              <div
                className="absolute top-1/3 left-1/4 w-14 h-14 bg-gradient-to-br from-premium-slate to-premium-slate-dark rounded-xl shadow-lg"
                style={{
                  transform: `translate(${scrollY * 0.3}px, ${-scrollY * 0.2}px) rotate(-30deg)`,
                  opacity: 0.8,
                }}
              ></div>

              <div
                className="absolute top-20 left-16 w-2 h-20 bg-gradient-to-b from-premium-accent to-transparent rounded-full"
                style={{
                  transform: `translateY(${scrollY * 0.2}px) rotate(20deg)`,
                  opacity: 0.7,
                }}
              ></div>

              <div
                className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full border-2 border-white/20 shadow-xl backdrop-blur-sm"
                style={{
                  transform: `translate(${scrollY * 0.15}px, ${scrollY * 0.25}px)`,
                }}
              ></div>
            </div>

            <div className="relative z-20 pointer-events-none">
              <div className="relative">
                <h2
                  className="text-6xl md:text-7xl font-black text-center relative z-10"
                  style={{
                    textShadow: `
                      0 4px 15px rgba(212, 175, 55, 0.5),
                      0 10px 40px rgba(212, 175, 55, 0.3),
                      inset 0 2px 5px rgba(255, 255, 255, 0.6),
                      0 0 50px rgba(255, 255, 200, 0.4),
                      inset -1px -1px 10px rgba(0, 0, 0, 0.2)
                    `,
                    backgroundImage:
                      "linear-gradient(135deg, #FCD34D 0%, #FBBF24 30%, #F59E0B 50%, #FBBF24 70%, #FCD34D 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.05em",
                    fontWeight: 900,
                  }}
                >
                  Planora
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
