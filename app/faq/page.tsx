"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"

const faqItems = [
  {
    question: "How do I book an event with Planora?",
    answer:
      "Simply navigate to our booking page, select your event type, fill in the details, choose your preferred organizer, and confirm your booking. Our team will contact you within 24 hours to finalize arrangements.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, UPI, and net banking. A 30% advance payment is required to confirm your booking, with the remaining balance due before the event date.",
  },
  {
    question: "Can I modify or cancel my booking?",
    answer:
      "Yes, you can modify your booking up to 7 days before the event date. Cancellations made 14 days prior receive a full refund. Cancellations within 14 days are subject to our refund policy.",
  },
  {
    question: "Do you offer custom event packages?",
    answer:
      "Our team specializes in creating customized event packages tailored to your specific needs and budget. Contact us at planora@scet.ac.in for a personalized quote.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We currently operate in 6 major Indian cities: Delhi, Mumbai, Surat, Ahmedabad, Kolkata, and Varanasi. Expansions to other cities are planned for the upcoming year.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 2-3 months in advance for optimal availability. However, we can accommodate bookings as short as 2 weeks for available dates.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">Find answers to common questions about Planora</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-left">{item.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 border-t border-border text-muted-foreground">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
