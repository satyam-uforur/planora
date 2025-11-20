"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { signIn } from "next-auth/react"

export default function Login() {
  const router = useRouter()
  const { login, signup } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    phone: "",
    address: "",
    secretKey: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setError("")

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await signup(
          formData.email,
          formData.password,
          formData.username,
          formData.name,
          formData.phone,
          formData.address,
          isAdmin ? "admin" : "user",
          isAdmin ? formData.secretKey : undefined,
        )
      }

      setTimeout(() => {
        setSubmitted(false)
        router.push(isAdmin ? "/admin" : "/dashboard")
      }, 1500)
    } catch (err) {
      console.error("[v0] Auth error:", err)
      setError(
        err instanceof Error ? err.message : isLogin ? "Invalid email/username or password" : "Account creation failed",
      )
      setSubmitted(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
              <p className="text-muted-foreground">{isLogin ? "Sign in to your account" : "Join Planora today"}</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isLogin ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email or Username</label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com or username"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Username</label>
                    <Input
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Your address"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isAdmin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <label htmlFor="isAdmin" className="text-sm font-medium">
                      Sign up as Admin
                    </label>
                  </div>

                  {isAdmin && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Admin Secret Key</label>
                      <Input
                        type="password"
                        value={formData.secretKey}
                        onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                        placeholder="Enter admin secret key"
                        required={isAdmin}
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={submitted}>
                {submitted ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="my-6 text-center text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({
                    email: "",
                    password: "",
                    username: "",
                    name: "",
                    phone: "",
                    address: "",
                    secretKey: "",
                  })
                  setIsAdmin(false)
                  setError("")
                }}
                className="text-primary font-bold ml-2 hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </Button>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}


// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useSession, signIn } from "next-auth/react"
// import Navigation from "@/components/navigation"
// import Footer from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card } from "@/components/ui/card"
// import { useAuth } from "@/context/auth-context"

// export default function Login() {
//   const router = useRouter()
//   const { data: session, status } = useSession()
//   const { login, signup } = useAuth()
//   const [isLogin, setIsLogin] = useState(true)
//   const [isAdmin, setIsAdmin] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     username: "",
//     name: "",
//     phone: "",
//     address: "",
//     secretKey: "",
//   })
//   const [submitted, setSubmitted] = useState(false)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     if (status === "authenticated" && session?.user) {
//       router.push("/dashboard")
//     }
//   }, [status, session, router])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setSubmitted(true)
//     setError("")

//     try {
//       if (isLogin) {
//         await login(formData.email, formData.password)
//       } else {
//         await signup(
//           formData.email,
//           formData.password,
//           formData.username,
//           formData.name,
//           formData.phone,
//           formData.address,
//           isAdmin ? "admin" : "user",
//           isAdmin ? formData.secretKey : undefined,
//         )
//       }

//       setTimeout(() => {
//         setSubmitted(false)
//         router.push(isAdmin ? "/admin" : "/dashboard")
//       }, 1500)
//     } catch (err) {
//       console.error("[v0] Auth error:", err)
//       setError(
//         err instanceof Error ? err.message : isLogin ? "Invalid email/username or password" : "Account creation failed",
//       )
//       setSubmitted(false)
//     }
//   }

//   const handleGoogleSignIn = async () => {
//     await signIn("google", { callbackUrl: "/dashboard" })
//   }

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin">
//             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
//           </div>
//           <p className="mt-4 text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md mx-auto">
//           <Card className="p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
//               <p className="text-muted-foreground">{isLogin ? "Sign in to your account" : "Join Planora today"}</p>
//             </div>

//             {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {isLogin ? (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Email or Username</label>
//                     <Input
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="your@email.com or username"
//                       required
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Email</label>
//                     <Input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="your@email.com"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Username</label>
//                     <Input
//                       value={formData.username}
//                       onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                       placeholder="Choose a username"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Full Name</label>
//                     <Input
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="Your full name"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Phone</label>
//                     <Input
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       placeholder="+1 (555) 123-4567"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Address</label>
//                     <Input
//                       value={formData.address}
//                       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                       placeholder="Your address"
//                       required
//                     />
//                   </div>

//                   <div className="flex items-center gap-2 pt-2">
//                     <input
//                       type="checkbox"
//                       id="isAdmin"
//                       checked={isAdmin}
//                       onChange={(e) => setIsAdmin(e.target.checked)}
//                       className="w-4 h-4 rounded"
//                     />
//                     <label htmlFor="isAdmin" className="text-sm font-medium">
//                       Sign up as Admin
//                     </label>
//                   </div>

//                   {isAdmin && (
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Admin Secret Key</label>
//                       <Input
//                         type="password"
//                         value={formData.secretKey}
//                         onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
//                         placeholder="Enter admin secret key"
//                         required={isAdmin}
//                       />
//                     </div>
//                   )}
//                 </>
//               )}

//               <div>
//                 <label className="block text-sm font-medium mb-2">Password</label>
//                 <Input
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>

//               <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={submitted}>
//                 {submitted ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
//               </Button>
//             </form>

//             <div className="my-6 text-center text-muted-foreground">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}
//               <button
//                 onClick={() => {
//                   setIsLogin(!isLogin)
//                   setFormData({
//                     email: "",
//                     password: "",
//                     username: "",
//                     name: "",
//                     phone: "",
//                     address: "",
//                     secretKey: "",
//                   })
//                   setIsAdmin(false)
//                   setError("")
//                 }}
//                 className="text-primary font-bold ml-2 hover:underline"
//               >
//                 {isLogin ? "Sign up" : "Sign in"}
//               </button>
//             </div>

//             <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleSignIn}>
//               Continue with Google
//             </Button>
//           </Card>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }
