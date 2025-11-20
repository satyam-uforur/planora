"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MarqueeDemo } from "@/components/marquee-reviews"
import { Calendar, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Top Wedding Trends of 2025 – What Couples Are Choosing Now",
    excerpt:
      "2025 weddings are all about personalization and experience-driven moments. Couples prefer minimalistic décor with bold color accents, intimate guest lists, and eco-friendly elements.",
    category: "Wedding",
    date: "Jan 15, 2025",
    author: "Sarah Johnson",
    image: "/wedding-trends-2025.jpg",
  },
  {
    id: 2,
    title: "Trending Birthday Theme Ideas for All Age Groups",
    excerpt:
      "Whether it's a kid's celebration or a milestone birthday, 2025 has brought fresh, creative ideas. Cartoon-inspired setups, glow-in-the-dark neon themes are trending.",
    category: "Birthday",
    date: "Jan 12, 2025",
    author: "Mike Chen",
    image: "/birthday-themes.jpg",
  },
  {
    id: 3,
    title: "Baby Shower Themes Loved by New Parents",
    excerpt:
      "Parents today want baby showers that feel modern, photogenic, and memorable. Soft pastel tones and gender-neutral themes are gaining popularity.",
    category: "Baby Shower",
    date: "Jan 10, 2025",
    author: "Emma Davis",
    image: "/baby-shower-decor.jpg",
  },
  {
    id: 4,
    title: "The Rise of Professional Event Planners in India",
    excerpt:
      "With busy schedules, more families prefer hiring professional planners. Event organizers ensure seamless coordination and stunning setups without stress.",
    category: "Planning",
    date: "Jan 8, 2025",
    author: "Rahul Sharma",
    image: "/event-planning.jpg",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Planora Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your guide to modern event planning. Tips, trends, and inspiration for every occasion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {post.author}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-4">What Our Clients Say</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Real reviews from real couples and families who trusted Planora with their special moments.
            </p>
            <MarqueeDemo />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
