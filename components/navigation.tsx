"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const { user: contextUser, logout: manualLogout } = useAuth()  // Assuming logout function is exposed in context
  const { data: session } = useSession()                         // NextAuth (Google) session

  // Determine which user is actually logged in
  const isGoogleUser = !!session?.user
  const isManualUser = !!contextUser && !isGoogleUser // Give priority to Google if both exist (optional)

  const activeUser = isGoogleUser ? session.user : contextUser
  const userName = activeUser?.name || activeUser?.email || "User"

  const dashboardLink = contextUser?.role === "admin" ? "/admin" : "/dashboard"

  // Unified sign out handler
  const handleSignOut = () => {
    setUserMenuOpen(false) // Close menu if open
    setIsOpen(false)       // Close mobile menu if open

    if (isGoogleUser) {
      signOut({ callbackUrl: '/' }) // Redirect to home after sign out; adjust as needed
    } else if (isManualUser && manualLogout) {
      manualLogout() // Call manual logout from context
    }
    // If both (unlikely), handle both, but priority to Google as per logic
  }

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground">
            Planora
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/gallery" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Gallery
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Blog
            </Link>
          </div>

          {/* Desktop Right Side - User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {activeUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition"
                >
                  <span className="text-sm font-medium">{userName}</span>
                  <ChevronDown size={16} className="text-muted-foreground" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                    {/* Manual user gets full dashboard options */}
                    {isManualUser && (
                      <>
                        <Link
                          href={dashboardLink}
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm hover:bg-muted"
                        >
                          {contextUser?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                        </Link>
                        <Link
                          href="/book"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm hover:bg-muted"
                        >
                          My Bookings
                        </Link>
                        <div className="h-px bg-border my-1" />
                      </>
                    )}

                    {/* Both get Sign Out, unified handler */}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-muted"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-4 space-y-3 border-t border-border mt-4">
            <Link href="/" className="block py-2 text-foreground hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/gallery" className="block py-2 text-foreground hover:text-primary font-medium">
              Gallery
            </Link>
            <Link href="/pricing" className="block py-2 text-foreground hover:text-primary font-medium">
              Pricing
            </Link>
            <Link href="/blog" className="block py-2 text-foreground hover:text-primary font-medium">
              Blog
            </Link>

            {activeUser ? (
              <>
                {isManualUser && (
                  <Link href={dashboardLink} className="block py-2 text-foreground hover:text-primary font-medium">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left py-2 text-red-600 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 text-primary font-medium">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
