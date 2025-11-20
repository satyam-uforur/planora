"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        console.log("[v0] Contact form submitted:", formData)
        setSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        setError("Failed to send message. Please try again.")
      }
    } catch (err) {
      console.error("[v0] Message error:", err)
      setError("Error sending message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground leading-relaxed">
                Have questions about booking your event? Our team is here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a href="mailto:planora@scet.ac.in" className="text-muted-foreground hover:text-primary transition">
                    planora@scet.ac.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition">
                    +91 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Address</h4>
                  <p className="text-muted-foreground">Surat, Gujarat, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-muted/30 p-8 rounded-2xl border border-border/40">
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background border-border/60"
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-background border-border/60"
              required
            />
            <textarea
              placeholder="Tell us about your event..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-border/60 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg"
            >
              {isSubmitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
