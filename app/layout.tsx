import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Thrive Studio - AI-Powered Innovation",
  description: "Empowering innovation through AI. We create cutting-edge AI applications that transform ideas into reality.",
  keywords: "AI, artificial intelligence, studio, innovation, development, Next.js",
  authors: [{ name: "Thrive Studio" }],
  creator: "Thrive Studio",
  publisher: "Thrive Studio",
  openGraph: {
    title: "Thrive Studio - AI-Powered Innovation",
    description: "Empowering innovation through AI. We create cutting-edge AI applications that transform ideas into reality.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-mono: ${GeistMono.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
