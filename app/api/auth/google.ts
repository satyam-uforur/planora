import { getUsersCollection } from "@/lib/db"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json() // frontend se Google profile bhej raha hai
    const usersCollection = await getUsersCollection()

    let user = await usersCollection.findOne({ email })

    if (!user) {
      const defaultPassword = Math.random().toString(36).slice(-10)
      const hashedPassword = await bcrypt.hash(defaultPassword, 10)

      const result = await usersCollection.insertOne({
        email,
        name,
        username: email.split("@")[0],
        password: hashedPassword,
        phone: "",
        address: "",
        role: "user",
        createdAt: new Date(),
      })

      user = { _id: result.insertedId, email, name, username: email.split("@")[0], role: "user" }
    }

    // Create JWT manually
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        username: user.username,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return NextResponse.json({ token, user })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Google login failed" }, { status: 500 })
  }
}
