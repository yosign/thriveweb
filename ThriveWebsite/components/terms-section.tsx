"use client"

import { useLanguage } from "@/contexts/language-context"

export default function TermsSection() {
  const { t } = useLanguage()

  return (
    <section id="terms" className="relative z-20 p-8 max-w-4xl mx-auto">
      <div className="text-left">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
          <span className="font-medium italic instrument">{t("terms.title.main")}</span> {t("terms.title.sub")}
        </h2>

        <div className="space-y-8 text-white/80">
          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("terms.interpretation.title")}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{t("terms.interpretation.subtitle")}</h4>
                <p className="text-sm leading-relaxed">{t("terms.interpretation.content")}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{t("terms.definitions.title")}</h4>
                <ul className="text-sm leading-relaxed space-y-2">
                  <li>
                    <strong>{t("terms.definitions.application.title")}:</strong>{" "}
                    {t("terms.definitions.application.content")}
                  </li>
                  <li>
                    <strong>{t("terms.definitions.company.title")}:</strong> {t("terms.definitions.company.content")}
                  </li>
                  <li>
                    <strong>{t("terms.definitions.service.title")}:</strong> {t("terms.definitions.service.content")}
                  </li>
                  <li>
                    <strong>{t("terms.definitions.you.title")}:</strong> {t("terms.definitions.you.content")}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("terms.acknowledgment.title")}</h3>
            <p className="text-sm leading-relaxed">{t("terms.acknowledgment.content")}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("terms.subscriptions.title")}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{t("terms.subscriptions.period.title")}</h4>
                <p className="text-sm leading-relaxed">{t("terms.subscriptions.period.content")}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{t("terms.subscriptions.cancellation.title")}</h4>
                <p className="text-sm leading-relaxed">{t("terms.subscriptions.cancellation.content")}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-2">{t("terms.subscriptions.fees.title")}</h4>
                <p className="text-sm leading-relaxed">{t("terms.subscriptions.fees.content")}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("terms.ip.title")}</h3>
            <p className="text-sm leading-relaxed">{t("terms.ip.content")}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("terms.liability.title")}</h3>
            <p className="text-sm leading-relaxed">{t("terms.liability.content")}</p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-white mb-4">{t("terms.contact.title")}</h3>
            <p className="text-sm leading-relaxed">
              {t("terms.contact.content")} <br />
              {t("terms.contact.email")}: <span className="text-blue-400">support@thriveaistudio.com</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
