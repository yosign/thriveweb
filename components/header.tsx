"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [activeTab, setActiveTab] = useState("hero")
  const { t } = useLanguage()

  const tabs = [
    { id: "hero", label: t("nav.home") },
    { id: "features", label: t("nav.features") },
    { id: "terms", label: t("nav.terms") },
    { id: "privacy", label: t("nav.privacy") },
  ]

  const scrollToSection = (sectionId: string) => {
    console.log("[v0] scrollToSection called with ID:", sectionId)
    setActiveTab(sectionId)

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      console.log("[v0] Element found:", element)

      if (element) {
        console.log("[v0] Scrolling to element")
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        console.log("[v0] Element not found!")
      }
    }, 100)
  }

  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <div className="flex items-center">
        <div className="text-white font-semibold text-xl">
          Thrive <span className="text-yellow-400">Studio</span>
        </div>
      </div>

      <nav className="flex items-center space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`text-xs font-light px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === tab.id ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
      </div>
    </header>
  )
}
