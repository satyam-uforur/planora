"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Trash2, MessageSquare, Mail, Users, TrendingUp } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"

interface Booking {
  _id: string
  eventType: string
  eventName: string
  date: string
  guestCount: string
  budget: string
  status: string
  userId: string
  createdAt: string
}

interface Message {
  _id: string
  name: string
  email: string
  message: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"bookings" | "messages">("bookings")

  useEffect(() => {
    if (user && user.role !== "admin") {
      window.location.href = "/dashboard"
      return
    }

    const fetchData = async () => {
      if (!user) return

      try {
        // Fetch all bookings for admin
        const bookingsResponse = await fetch("/api/bookings", {
          headers: {
            "x-user-id": user.userId,
            "x-is-admin": "true",
          },
        })

        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json()
          setBookings(bookingsData)
        }

        // Fetch all messages
        const messagesResponse = await fetch("/api/messages")
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json()
          setMessages(messagesData)
        }
      } catch (error) {
        console.error("[v0] Fetch data error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

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

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-4">You do not have permission to access this page</p>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId, status: newStatus }),
      })

      if (response.ok) {
        setBookings(bookings.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b)))
        alert(`Booking ${newStatus.toLowerCase()}!`)
      }
    } catch (error) {
      console.error("[v0] Status change error:", error)
      alert("Failed to update booking status")
    }
  }

  const pendingBookings = bookings.filter((b) => b.status === "Pending")
  const approvedBookings = bookings.filter((b) => b.status === "Approved")
  const rejectedBookings = bookings.filter((b) => b.status === "Rejected")
  const unreadMessages = messages.filter((m) => m.status === "unread")
  const totalRevenue = bookings
    .filter((b) => b.status === "Approved")
    .reduce((sum, b) => sum + Number.parseInt(b.budget), 0)

  const conversionRate = bookings.length > 0 ? ((approvedBookings.length / bookings.length) * 100).toFixed(1) : "0"

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome, {user.name}</p>
            </div>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading data...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-5 gap-4 mb-8">
                <Card className="p-6 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">{pendingBookings.length}</div>
                      <p className="text-white/90 text-sm">Pending</p>
                    </div>
                    <TrendingUp size={24} />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">{approvedBookings.length}</div>
                      <p className="text-white/90 text-sm">Approved</p>
                    </div>
                    <CheckCircle size={24} />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-red-500 to-rose-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">{rejectedBookings.length}</div>
                      <p className="text-white/90 text-sm">Rejected</p>
                    </div>
                    <Trash2 size={24} />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">${totalRevenue}</div>
                      <p className="text-white/90 text-sm">Revenue</p>
                    </div>
                    <TrendingUp size={24} />
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">{conversionRate}%</div>
                      <p className="text-white/90 text-sm">Conversion</p>
                    </div>
                    <Users size={24} />
                  </div>
                </Card>
              </div>

              <div className="flex gap-4 mb-8">
                <Button
                  variant={activeTab === "bookings" ? "default" : "outline"}
                  onClick={() => setActiveTab("bookings")}
                >
                  <Mail size={18} className="mr-2" />
                  All Bookings ({bookings.length})
                </Button>
                <Button
                  variant={activeTab === "messages" ? "default" : "outline"}
                  onClick={() => setActiveTab("messages")}
                >
                  <MessageSquare size={18} className="mr-2" />
                  Messages ({unreadMessages.length})
                </Button>
              </div>

              {activeTab === "bookings" && (
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <Card className="p-12 text-center">
                      <p className="text-muted-foreground text-lg">No bookings yet</p>
                    </Card>
                  ) : (
                    bookings.map((booking) => (
                      <Card key={booking._id} className="p-6">
                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{booking.eventName}</h3>
                            <p className="text-sm text-muted-foreground">{booking.eventType}</p>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Date & Guests</div>
                            <div className="font-medium">{booking.date}</div>
                            <div className="text-sm text-muted-foreground">{booking.guestCount} guests</div>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Budget</div>
                            <div className="font-medium text-lg">${booking.budget}</div>
                          </div>

                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                booking.status === "Approved"
                                  ? "bg-green-100 text-green-700"
                                  : booking.status === "Rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-border">
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(booking._id, "Approved")}
                            disabled={booking.status === "Approved"}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle size={18} className="mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(booking._id, "Rejected")}
                            disabled={booking.status === "Rejected"}
                            variant="outline"
                          >
                            <Trash2 size={18} className="mr-2" />
                            Reject
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              )}

              {activeTab === "messages" && (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <Card className="p-12 text-center">
                      <p className="text-muted-foreground text-lg">No messages yet</p>
                    </Card>
                  ) : (
                    messages.map((msg) => (
                      <Card key={msg._id} className="p-6 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{msg.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Mail size={14} />
                              {msg.email}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              msg.status === "unread" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>
                        <p className="text-foreground mb-4">{msg.message}</p>
                        <p className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleString()}</p>
                      </Card>
                    ))
                  )}
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
