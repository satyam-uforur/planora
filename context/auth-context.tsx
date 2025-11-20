"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  userId: string
  name: string
  email: string
  username: string
  role: "user" | "admin"
  phone?: string
  address?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (emailOrUsername: string, password: string) => Promise<void>
  signup: (
    email: string,
    password: string,
    username: string,
    name: string,
    phone: string,
    address: string,
    role: string,
    secretKey?: string,
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("planoraUser")
    const savedToken = localStorage.getItem("planoraToken")
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("[v0] Error parsing saved user:", error)
        localStorage.removeItem("planoraUser")
        localStorage.removeItem("planoraToken")
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (
    email: string,
    password: string,
    username: string,
    name: string,
    phone: string,
    address: string,
    role: string,
    secretKey?: string,
  ) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, name, phone, address, role, secretKey, action: "signup" }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Signup failed")
      }

      const data = await response.json()
      const newUser: User = {
        userId: data.userId,
        name: data.name,
        email: data.email,
        username: data.username,
        role: data.role,
        phone,
        address,
        avatar: `https://avatar.vercel.sh/${email}`,
      }

      setUser(newUser)
      localStorage.setItem("planoraUser", JSON.stringify(newUser))
      localStorage.setItem("planoraToken", "token_" + data.userId)
    } catch (error) {
      console.error("[v0] Signup error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (emailOrUsername: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password, action: "login" }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Login failed")
      }

      const data = await response.json()
      const newUser: User = {
        userId: data.userId,
        name: data.name,
        email: data.email,
        username: data.username,
        role: data.role,
        phone: data.phone,
        address: data.address,
        avatar: `https://avatar.vercel.sh/${data.email}`,
      }

      setUser(newUser)
      localStorage.setItem("planoraUser", JSON.stringify(newUser))
      localStorage.setItem("planoraToken", "token_" + data.userId)
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("planoraUser")
    localStorage.removeItem("planoraToken")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, signup }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
