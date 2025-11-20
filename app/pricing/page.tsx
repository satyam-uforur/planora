"use client"

import { useAuth } from "@/context/auth-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Basic",
    price: "₹4,999",
    description: "Perfect for small gatherings",
    features: [
      "Basic event décor",
      "Standard color theme",
      "Backdrop + balloon styling",
      "Photographer recommendations",
      "Planner coordination via phone",
    ],
    bestFor: "Birthdays • Baby milestones",
    cta: "Get Started",
  },
  {
    name: "Standard",
    price: "₹14,999",
    description: "Balanced & crowd-favorite",
    features: [
      "All Basic features",
      "Premium backdrop",
      "Theme-based décor",
      "Table styling + props",
      "Custom color palette",
      "Dedicated planner support",
      "Event day checklist",
    ],
    bestFor: "Baby showers • Engagements",
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Premium",
    price: "₹40,000",
    description: "Highly personalized experience",
    features: [
      "All Standard features",
      "Custom photo booth",
      "LED lighting & stage add-ons",
      "Creative entry setup",
      "Vendor coordination",
      "Dedicated planner team",
    ],
    bestFor: "Weddings • Receptions",
    cta: "Get Started",
  },
  {
    name: "Luxury",
    price: "₹1,00,000+",
    description: "Ultimate customization",
    features: [
      "Complete end-to-end design",
      "3D concept planning",
      "Premium floral installations",
      "Guest welcome experience",
      "Dedicated team & on-ground support",
      "Unlimited revisions",
    ],
    bestFor: "Luxury weddings • Corporate",
    cta: "Contact Us",
  },
]

export default function PricingPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect package for your event. All plans include professional coordination and stunning décor.
            </p>
          </div>

          {!user && (
            <div className="mb-12 p-6 bg-accent/20 border border-accent rounded-lg text-center">
              <p className="text-foreground font-medium mb-4">Sign in to book and see pricing details</p>
              <Link href="/login">
                <Button>Sign In Now</Button>
              </Link>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-6 flex flex-col h-full transition-all ${
                  plan.featured ? "ring-2 ring-primary lg:scale-105 shadow-lg" : "hover:shadow-lg"
                }`}
              >
                {plan.featured && (
                  <div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {!plan.price.includes("+") && <span className="text-muted-foreground ml-2">onwards</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <Check size={18} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">BEST FOR</p>
                  <p className="text-sm text-foreground">{plan.bestFor}</p>
                </div>

                <Button className="w-full" variant={plan.featured ? "default" : "outline"} disabled={!user}>
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Add-On Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Photographer & Videographer", icon: "📸" },
                { name: "Drone Shots", icon: "🚁" },
                { name: "Live Music / DJ", icon: "🎵" },
                { name: "Return Gift Curation", icon: "🎁" },
                { name: "Custom Invitations", icon: "✉️" },
                { name: "LED Screens & Lighting", icon: "💡" },
              ].map((addon, i) => (
                <Card key={i} className="p-6 text-center hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{addon.icon}</div>
                  <h4 className="font-bold">{addon.name}</h4>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
