import { getMessagesCollection } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const messagesCollection = await getMessagesCollection()
    const messages = await messagesCollection.find({}).sort({ createdAt: -1 }).toArray()

    console.log("[v0] Fetched messages, Count:", messages.length)

    return NextResponse.json(
      messages.map((msg) => ({
        ...msg,
        _id: msg._id.toString(),
      })),
    )
  } catch (error) {
    console.error("[v0] Fetch messages error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const messageData = await request.json()
    const messagesCollection = await getMessagesCollection()

    const result = await messagesCollection.insertOne({
      name: messageData.name,
      email: messageData.email,
      message: messageData.message,
      status: "unread",
      createdAt: new Date(),
    })

    console.log("[v0] New message created:", result.insertedId)

    return NextResponse.json({
      id: result.insertedId.toString(),
      ...messageData,
      status: "unread",
    })
  } catch (error) {
    console.error("[v0] Create message error:", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
