"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-sm max-w-none">
          <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Booking & Reservation</h2>
          <p>
            By booking with Planora, you agree to our terms of service. All bookings are subject to availability and
            confirmation by our team. A 30% advance payment is non-refundable and is required to secure your booking.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Cancellation Policy</h2>
          <p>
            Cancellations made 14 days or more prior to the event receive a full refund minus the booking fee.
            Cancellations within 14 days receive a 50% refund. No refunds are issued for cancellations within 7 days of
            the event.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Liability</h2>
          <p>
            Planora is not liable for any unforeseen circumstances including natural disasters, accidents, or
            unavoidable events beyond our control. In such cases, we will make reasonable efforts to reschedule your
            event.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Conduct & Behavior</h2>
          <p>
            All guests and staff are expected to conduct themselves professionally. Planora reserves the right to
            terminate any event if deemed necessary due to unruly behavior, illegal activity, or damage to property.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Payment Terms</h2>
          <p>
            The balance amount is due 7 days before the event. Failure to pay may result in cancellation. We accept
            credit cards, debit cards, UPI, and net banking.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Modification of Terms</h2>
          <p>
            Planora reserves the right to modify these terms at any time. Changes will be effective immediately upon
            posting to our website.
          </p>

          <p className="mt-8 text-muted-foreground">Last updated: August 2025</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
