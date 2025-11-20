"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

type BookingStep = "event-type" | "details" | "date-time" | "organizer" | "confirmation"

interface BookingData {
  eventType: string
  eventName: string
  guestCount: string
  date: string
  time: string
  budget: string
  notes: string
  organizerPreference: string
}

export default function BookEvent() {
  const { user, isLoading } = useAuth()
  const [step, setStep] = useState<BookingStep>("event-type")
  const [bookingData, setBookingData] = useState<BookingData>({
    eventType: "",
    eventName: "",
    guestCount: "",
    date: "",
    time: "",
    budget: "",
    notes: "",
    organizerPreference: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold mb-4">Sign In to Book</h2>
            <p className="text-muted-foreground mb-8">
              You need to be logged in to book an event. Sign in or create an account to get started.
            </p>
            <Link href="/login">
              <Button size="lg" className="w-full">
                Go to Sign In
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleNext = () => {
    const steps: BookingStep[] = ["event-type", "details", "date-time", "organizer", "confirmation"]
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const steps: BookingStep[] = ["event-type", "details", "date-time", "organizer", "confirmation"]
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.userId,
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        throw new Error("Failed to create booking")
      }

      alert("Booking submitted successfully! Our team will contact you soon.")
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("[v0] Booking error:", error)
      alert("Failed to submit booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Book Your Event</h1>
            <p className="text-muted-foreground">Follow these steps to book your perfect event</p>
          </div>

          <div className="flex justify-between mb-12">
            {["event-type", "details", "date-time", "organizer", "confirmation"].map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step === s
                      ? "bg-primary text-white"
                      : i < ["event-type", "details", "date-time", "organizer", "confirmation"].indexOf(step)
                        ? "bg-accent text-white"
                        : "bg-secondary text-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                {i < 4 && <div className="flex-1 h-1 mx-2 bg-border" />}
              </div>
            ))}
          </div>

          <Card className="p-8">
            {step === "event-type" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Select Event Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  {["Wedding", "Birthday", "Baby Shower", "Corporate", "Family Event", "Party"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBookingData({ ...bookingData, eventType: type })}
                      className={`p-4 border-2 rounded-lg transition ${
                        bookingData.eventType === type
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div className="font-bold">{type}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "details" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Event Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Name</label>
                    <Input
                      value={bookingData.eventName}
                      onChange={(e) => setBookingData({ ...bookingData, eventName: e.target.value })}
                      placeholder="e.g., John's Birthday"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Guests</label>
                    <Input
                      type="number"
                      value={bookingData.guestCount}
                      onChange={(e) => setBookingData({ ...bookingData, guestCount: e.target.value })}
                      placeholder="e.g., 50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget (USD)</label>
                    <Input
                      type="number"
                      value={bookingData.budget}
                      onChange={(e) => setBookingData({ ...bookingData, budget: e.target.value })}
                      placeholder="e.g., 5000"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === "date-time" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Choose Date & Time</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Date</label>
                    <Input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Time</label>
                    <Input
                      type="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Special Notes (Optional)</label>
                    <textarea
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      placeholder="Any special requirements or preferences..."
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === "organizer" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Organizer Preference</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience Level</label>
                    <div className="grid grid-cols-3 gap-4">
                      {["Junior", "Professional", "Expert"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setBookingData({ ...bookingData, organizerPreference: level })}
                          className={`p-4 border-2 rounded-lg transition font-bold ${
                            bookingData.organizerPreference === level
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "confirmation" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Confirm Booking</h2>
                <div className="space-y-4 bg-secondary/50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium">Event Type:</span>
                    <span>{bookingData.eventType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Event Name:</span>
                    <span>{bookingData.eventName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Guests:</span>
                    <span>{bookingData.guestCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Budget:</span>
                    <span>${bookingData.budget}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} disabled={step === "event-type"}>
                Back
              </Button>
              <Button
                onClick={step === "confirmation" ? handleSubmit : handleNext}
                disabled={!bookingData.eventType || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : step === "confirmation" ? "Complete Booking" : "Next"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
