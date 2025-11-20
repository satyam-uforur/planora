import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getUsersCollection } from "@/lib/db"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Runs when user signs in
    async signIn({ user }) {
      const usersCollection = await getUsersCollection()

      const existing = await usersCollection.findOne({ email: user.email })

      if (!existing) {
        // Hash a default random password (even if user won't use it)
        const defaultPassword = "1234" // random string
        const hashedPassword = await bcrypt.hash(defaultPassword, 10)

        await usersCollection.insertOne({
          email: user.email,
          name: user.name,
          username: user.email?.split("@")[0],
          password: hashedPassword, // store hashed password
          phone: "",
          address: "",
          role: "user",
          createdAt: new Date(),
        })
      }

      return true
    },

    // ⭐ Store userId in JWT
    async jwt({ token }) {
      const usersCollection = await getUsersCollection()
      const user = await usersCollection.findOne({ email: token.email })

      if (user) {
        token.userId = user._id.toString()
        token.role = user.role
      }

      return token
    },

    // ⭐ Session reads data from JWT
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId
        session.user.role = token.role
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }
