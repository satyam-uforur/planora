// ... existing imports and code ...

"use client"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import EventCategories from "@/components/event-categories"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import CTASection from "@/components/cta-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { GlobeDemo as GlobeLocations} from "@/components/globe-locations"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <EventCategories />
      <FeaturesSection />
      <TestimonialsSection />
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Serving Across India</h2>
          <p className="text-center text-muted-foreground mb-12">
            From Mumbai to Delhi, our professional event organizers are ready to make your event unforgettable
          </p>
          <GlobeLocations />
        </div>
      </div>
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  )
}
