import { getBookingsCollection } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const isAdmin = request.headers.get("x-is-admin") === "true"

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const bookingsCollection = await getBookingsCollection()

    let bookings
    if (isAdmin) {
      bookings = await bookingsCollection.find({}).sort({ createdAt: -1 }).toArray()
    } else {
      bookings = await bookingsCollection
        .find({ userId: userId }) // Treat as string (email)
        .sort({ createdAt: -1 })
        .toArray()
    }

    console.log("[v0] Fetched bookings, Admin:", isAdmin, "Count:", bookings.length)

    return NextResponse.json(
      bookings.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
        userId: booking.userId, // Already string
      })),
    )
  } catch (error) {
    console.error("[v0] Fetch bookings error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const bookingData = await request.json()
    const bookingsCollection = await getBookingsCollection()

    const result = await bookingsCollection.insertOne({
      userId: userId, // Insert as string (email)
      eventType: bookingData.eventType,
      eventName: bookingData.eventName,
      guestCount: bookingData.guestCount,
      date: bookingData.date,
      time: bookingData.time,
      budget: bookingData.budget,
      notes: bookingData.notes || "",
      organizerPreference: bookingData.organizerPreference,
      status: "Pending",
      createdAt: new Date(),
    })

    console.log("[v0] New booking created:", result.insertedId, "for user:", userId)

    return NextResponse.json({
      id: result.insertedId.toString(),
      ...bookingData,
      status: "Pending",
    })
  } catch (error) {
    console.error("[v0] Create booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const bookingData = await request.json()
    const { bookingId, status } = bookingData

    if (!bookingId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const bookingsCollection = await getBookingsCollection()
    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status, updatedAt: new Date() } },
    )

    console.log("[v0] Booking status updated:", bookingId, "Status:", status)

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount })
  } catch (error) {
    console.error("[v0] Update booking error:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get("id")
    const userId = request.headers.get("x-user-id")

    if (!bookingId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const bookingsCollection = await getBookingsCollection()
    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(bookingId),
      userId: userId, // String for ownership check
    })

    console.log("[v0] Booking deleted:", bookingId)

    return NextResponse.json({ success: true, deletedCount: result.deletedCount })
  } catch (error) {
    console.error("[v0] Delete booking error:", error)
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 })
  }
}
