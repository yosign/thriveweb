"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import FeaturesSection from "@/components/features-section"
import TermsSection from "@/components/terms-section"
import PrivacySection from "@/components/privacy-section"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"

export default function StudioWebsite() {
  const [activeSection, setActiveSection] = useState("Home")

  const renderContent = () => {
    switch (activeSection) {
      case "Features":
        return <FeaturesSection />
      case "Terms":
        return <TermsSection />
      case "Privacy Policy":
        return <PrivacySection />
      default:
        return <HeroContent />
    }
  }

  return (
    <ShaderBackground>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.tagName === "BUTTON" && target.textContent) {
            const tabNames = ["Home", "Features", "Terms", "Privacy Policy"]
            if (tabNames.includes(target.textContent)) {
              setActiveSection(target.textContent)
            }
          }
        }}
      >
        <Header />
        {renderContent()}
        <PulsingCircle />
      </div>
    </ShaderBackground>
  )
}
