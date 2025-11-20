import { getUsersCollection } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, action, username, name, phone, address, role, secretKey } = await request.json()
    const usersCollection = await getUsersCollection()

    if (action === "signup") {
      if (role === "admin") {
        const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "admin123"
        if (secretKey !== ADMIN_SECRET_KEY) {
          return NextResponse.json({ error: "Invalid admin secret key" }, { status: 400 })
        }
      }

      const existingUser = await usersCollection.findOne({
        $or: [{ email }, { username }],
      })
      if (existingUser) {
        return NextResponse.json({ error: "User or username already exists" }, { status: 400 })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const result = await usersCollection.insertOne({
        email,
        username,
        name: name || username,
        password: hashedPassword,
        phone,
        address,
        role: role || "user",
        createdAt: new Date(),
      })

      console.log("[v0] New user created:", username, "Role:", role)

      return NextResponse.json({
        userId: result.insertedId.toString(),
        email,
        username,
        name: name || username,
        role: role || "user",
      })
    }

    if (action === "login") {
      const user = await usersCollection.findOne({
        $or: [{ email: email }, { username: email }],
      })
      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      console.log("[v0] User logged in:", user.username || user.email)

      return NextResponse.json({
        userId: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role || "user",
        phone: user.phone,
        address: user.address,
      })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
