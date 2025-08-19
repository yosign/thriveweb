"use client"

import { useLanguage } from "@/contexts/language-context"

export default function PrivacySection() {
  const { t } = useLanguage()

  return (
    <section id="privacy" className="relative z-20 p-8 max-w-4xl mx-auto">
      <div className="text-left">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
          <span className="font-medium italic instrument">{t("privacy.title.main")}</span> {t("privacy.title.sub")}
        </h2>

        <div className="space-y-8 text-white/80">
          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.collect.title")}</h3>
            <p className="text-sm leading-relaxed">{t("privacy.collect.content")}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.use.title")}</h3>
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{t("privacy.use.intro")}:</p>
              <ul className="text-sm leading-relaxed space-y-2 ml-4">
                <li>• {t("privacy.use.item1")}</li>
                <li>• {t("privacy.use.item2")}</li>
                <li>• {t("privacy.use.item3")}</li>
                <li>• {t("privacy.use.item4")}</li>
                <li>• {t("privacy.use.item5")}</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.security.title")}</h3>
            <p className="text-sm leading-relaxed">{t("privacy.security.content")}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.ai.title")}</h3>
            <p className="text-sm leading-relaxed">{t("privacy.ai.content")}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.retention.title")}</h3>
            <p className="text-sm leading-relaxed">{t("privacy.retention.content")}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.rights.title")}</h3>
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{t("privacy.rights.intro")}:</p>
              <ul className="text-sm leading-relaxed space-y-2 ml-4">
                <li>• {t("privacy.rights.item1")}</li>
                <li>• {t("privacy.rights.item2")}</li>
                <li>• {t("privacy.rights.item3")}</li>
                <li>• {t("privacy.rights.item4")}</li>
                <li>• {t("privacy.rights.item5")}</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.contact.title")}</h3>
            <p className="text-sm leading-relaxed">
              {t("privacy.contact.content")} <br />
              {t("privacy.contact.email")}: <span className="text-blue-400">privacy@thriveaistudio.com</span> <br />
              {t("privacy.contact.response")}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("privacy.updates.title")}</h3>
            <p className="text-sm leading-relaxed">{t("privacy.updates.content")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
