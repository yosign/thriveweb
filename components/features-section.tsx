"use client"

import { useLanguage } from "@/contexts/language-context"

export default function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      title: t("features.ai.title"),
      description: t("features.ai.description"),
      version: "2.0.0",
      status: "Latest",
    },
    {
      title: t("features.interface.title"),
      description: t("features.interface.description"),
      version: "1.9.5",
      status: "Stable",
    },
    {
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
      version: "1.9.0",
      status: "Enhanced",
    },
    {
      title: t("features.models.title"),
      description: t("features.models.description"),
      version: "1.8.2",
      status: "Professional",
    },
  ]

  const versionHistory = [
    {
      version: "2.0.0",
      title: "Major AI Enhancement",
      features: [
        "Revolutionary AI-powered automation system",
        "Enhanced machine learning capabilities",
        "Improved performance and reliability",
        "Advanced customization options",
      ],
    },
    {
      version: "1.9.5",
      title: "Interface Improvements",
      features: [
        "Cleaner, more intuitive user interface",
        "Better accessibility features",
        "Streamlined workflow processes",
      ],
    },
    {
      version: "1.9.0",
      title: "Analytics Update",
      features: ["Advanced analytics dashboard", "Real-time performance monitoring", "Custom reporting tools"],
    },
  ]

  return (
    <section id="features" className="relative z-20 p-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
          <span className="font-medium italic instrument">{t("features.title")}</span> {t("features.subtitle")}
        </h2>
        <p className="text-white/70 text-sm max-w-2xl mx-auto">{t("features.description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 font-medium">
                v{feature.version}
              </span>
              <span className="text-xs text-white/50">{feature.status}</span>
            </div>
            <h3 className="text-white font-medium text-lg mb-2">{feature.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-12">
        <h3 className="text-2xl font-light text-white mb-8 text-center">
          <span className="font-medium italic instrument">{t("features.version.history")}</span>{" "}
          {t("features.version.history.subtitle")}
        </h3>

        <div className="space-y-8">
          {versionHistory.map((release, index) => (
            <div key={index} className="border-l-2 border-white/20 pl-6 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-medium text-white">v{release.version}</span>
                <span className="text-white/70 text-sm">{release.title}</span>
              </div>
              <ul className="space-y-2">
                {release.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-white/60 text-sm flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
        <h4 className="text-xl font-medium text-white mb-4">{t("features.coming.soon")}</h4>
        <p className="text-white/70 text-sm max-w-2xl mx-auto">{t("features.coming.description")}</p>
      </div>
    </section>
  )
}
