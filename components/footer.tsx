"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Footer() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer
      className="bg-slate-900 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 text-slate-100 transition-colors"
      style={{
        opacity: 0.85 + scrollY * 0.0001,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Planora</h3>
            <p className="text-sm text-slate-400">Premium event planning and booking platform</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-slate-400 hover:text-white transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-slate-400 hover:text-white transition">
                  Book Event
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-slate-400 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="mailto:planoracontact@scet.ac.in" className="text-sm text-slate-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:planora@scet.ac.in" className="text-sm text-slate-400 hover:text-white transition">
                  Report Issue
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-400 text-center">&copy; 2025 Planora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
