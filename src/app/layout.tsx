import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import AuthProvider from "@/components/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Griddit.tv — Watch Multiple Videos Together",
  description: "Create and share multi-video grids. Watch sports, streams, and more simultaneously.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
