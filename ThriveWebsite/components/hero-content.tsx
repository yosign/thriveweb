"use client"

import { useLanguage } from "@/contexts/language-context"

export default function HeroContent() {
  const { t } = useLanguage()

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main id="hero" className="absolute bottom-8 left-8 z-20 max-w-2xl">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-6 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">🤖 AI-Powered Studio</span>
        </div>

        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-6">
          <span className="font-medium italic instrument">{t("hero.title")}</span>
        </h1>

        <h2 className="text-xl md:text-2xl font-light text-white/90 mb-4">{t("hero.subtitle")}</h2>

        <p className="text-sm font-light text-white/70 mb-8 leading-relaxed max-w-lg">{t("hero.description")}</p>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={scrollToFeatures}
            className="px-8 py-3 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer"
          >
            {t("hero.cta")}
          </button>
          <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </main>
  )
}
