"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-sm max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information Collection</h2>
          <p>
            Planora collects personal information including name, email, phone number, and address for booking and
            communication purposes. This information is used solely to provide our services and improve user experience.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Data Protection</h2>
          <p>
            Your data is encrypted and stored securely. We do not share personal information with third parties without
            your consent, except as required by law.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>
          <p>
            Our website uses cookies to enhance user experience. You can disable cookies in your browser settings at any
            time.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-party Links</h2>
          <p>
            Planora is not responsible for the privacy practices of external websites linked from our site. Please
            review their privacy policies before sharing information.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
          <p>
            You have the right to access, modify, or delete your personal data. Contact us at planora@scet.ac.in to
            exercise these rights.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact</h2>
          <p>For privacy-related inquiries, contact us at planora@scet.ac.in</p>

          <p className="mt-8 text-muted-foreground">Last updated: August 2025</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
