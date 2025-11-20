"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Users, MapPin, Clock, MoreVertical, Mail, Trash2, Edit2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface Booking {
  _id: string
  eventType: string
  eventName: string
  date: string
  time: string
  guestCount: string
  status: string
  organizerPreference: string
  budget: string
}

export default function Dashboard() {
  const { user: customUser, logout: customLogout } = useAuth()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const user =
    customUser ||
    (session?.user
      ? {
          userId: session.user.email || "",
          email: session.user.email || "",
          username: session.user.name || "",
          name: session.user.name || "",
          role: "user" as const,
          avatar: session.user.image || "/placeholder.svg",
        }
      : null)

  useEffect(() => {
    if (status === "unauthenticated" && !customUser) {
      router.push("/login")
    }
  }, [status, customUser, router])

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return

      try {
        const response = await fetch("/api/bookings", {
          headers: {
            "x-user-id": user.userId,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setBookings(data)
        }
      } catch (error) {
        console.log("[v0] Fetch bookings error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [user])

  // Fixed: Only show loading if NextAuth is loading AND no custom user (avoids infinite loading on unauthenticated)
  if (status === "loading" && !customUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Please log in</h2>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleDeleteEvent = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/bookings?id=${bookingId}`, {
        method: "DELETE",
        headers: {
          "x-user-id": user.userId,
        },
      })

      if (response.ok) {
        setBookings(bookings.filter((b) => b._id !== bookingId))
        alert("Event deleted successfully")
      }
    } catch (error) {
      console.log("[v0] Delete error:", error)
      alert("Failed to delete event")
    }
  }

  // Updated: Improved handleLogout with proper custom logout call, error handling, and forced redirect
  // For form-based (custom auth), this now properly calls customLogout and redirects
  const handleLogout = async () => {
    try {
      if (session) {
        // NextAuth logout
        const { signOut } = await import("next-auth/react")
        await signOut({ callbackUrl: "/login" })
      } else if (customUser) {
        // Custom auth (form-based) logout - now actually calling it
        await customLogout() // This should clear custom auth state (e.g., localStorage, context)
      }

      // Force clear local state and redirect (helps with any lag in state updates)
      setBookings([])
      setIsLoading(true) // Temporarily show loading to smooth transition
      router.push("/login")
      router.refresh() // Refresh router state for full revalidation
    } catch (error) {
      console.error("[v0] Logout error:", error)
      // Fallback: Hard redirect for form-based or any failures
      if (customUser) {
        // Manually clear if customLogout failed
        localStorage.removeItem("token") // Adjust key based on your auth impl
        // Or any other manual clear (cookies, etc.)
      }
      window.location.href = "/login"
    }
  }

  const upcomingBookings = bookings.filter((b) => new Date(b.date) > new Date())
  const pastBookings = bookings.filter((b) => new Date(b.date) <= new Date())
  const displayBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 bg-gradient-to-r from-primary/20 to-accent/20 p-8 rounded-lg border border-primary/20">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar || "/placeholder.svg?height=64&width=64&query=user%20avatar"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-primary"
                />
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail size={16} />
                    {user.email}
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">My Events</h2>
            <p className="text-muted-foreground">Manage and track your event bookings</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading bookings...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <div className="text-3xl font-bold">{bookings.length}</div>
                  <p className="text-blue-100">Total Bookings</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <div className="text-3xl font-bold">{upcomingBookings.length}</div>
                  <p className="text-green-100">Upcoming</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                  <div className="text-3xl font-bold">{pastBookings.length}</div>
                  <p className="text-yellow-100">Past Events</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <div className="text-3xl font-bold">
                    ${bookings.reduce((sum, b) => sum + (Number.parseInt(b.budget) || 0), 0).toLocaleString()}
                  </div>
                  <p className="text-purple-100">Total Spent</p>
                </Card>
              </div>

              <div className="flex gap-4 mb-8">
                <Button
                  variant={activeTab === "upcoming" ? "default" : "outline"}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming Events
                </Button>
                <Button variant={activeTab === "past" ? "default" : "outline"} onClick={() => setActiveTab("past")}>
                  Past Events
                </Button>
              </div>

              <div className="space-y-4">
                {displayBookings.length === 0 ? (
                  <Card className="p-12 text-center">
                    <p className="text-muted-foreground mb-4">No {activeTab} bookings yet</p>
                    <Link href="/book">
                      <Button className="bg-primary hover:bg-primary/90">Book Your First Event</Button>
                    </Link>
                  </Card>
                ) : (
                  displayBookings.map((booking) => (
                    <Card key={booking._id} className="p-6 hover:shadow-lg transition-all relative">
                      <div className="grid md:grid-cols-5 gap-4 items-start">
                        <div>
                          <h3 className="font-bold text-lg">{booking.eventName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.eventType}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary" />
                            <span>{booking.guestCount} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-primary" />
                            <span className="text-muted-foreground">{booking.organizerPreference}</span>
                          </div>
                        </div>

                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "Approved"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="flex justify-end relative">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === booking._id ? null : booking._id)}
                            className="p-2 hover:bg-secondary rounded-lg transition"
                          >
                            <MoreVertical size={20} />
                          </button>

                          {openMenuId === booking._id && (
                            <div className="absolute right-0 top-10 bg-background border border-border rounded-lg shadow-lg z-10 min-w-48">
                              <button
                                onClick={() => alert("Edit feature coming soon")}
                                className="w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 transition"
                              >
                                <Edit2 size={16} />
                                Edit Event
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteEvent(booking._id)
                                  setOpenMenuId(null)
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-700 flex items-center gap-2 transition"
                              >
                                <Trash2 size={16} />
                                Delete Event
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              {bookings.length === 0 && (
                <div className="mt-12 text-center">
                  <p className="text-muted-foreground mb-4">Ready to book your first event?</p>
                  <Link href="/book">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Book a New Event
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}