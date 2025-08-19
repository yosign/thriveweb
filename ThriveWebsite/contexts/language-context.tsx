"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "zh" | "ja" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.terms": "Terms",
    "nav.privacy": "Privacy Policy",

    // Hero
    "hero.title": "Thrive",
    "hero.subtitle": "Empowering Innovation Through AI",
    "hero.description":
      "We create cutting-edge AI applications that transform ideas into reality. Our studio specializes in building intelligent systems that drive business growth and enhance user experiences.",
    "hero.cta": "View Our Work",

    // Features
    "features.title": "AI-Powered",
    "features.subtitle": "Features",
    "features.description": "Discover our cutting-edge AI capabilities and the latest enhancements to our platform",
    "features.ai.title": "AI-Powered Automation",
    "features.ai.description":
      "Intelligent workflows that adapt and optimize based on your specific needs and usage patterns.",
    "features.interface.title": "Smart Interface Design",
    "features.interface.description":
      "Cleaner, more intuitive user interfaces with AI-driven personalization and adaptive layouts.",
    "features.analytics.title": "Advanced Analytics",
    "features.analytics.description":
      "Deep insights and performance metrics with AI-powered recommendations for optimization.",
    "features.models.title": "Custom AI Models",
    "features.models.description":
      "Tailored machine learning models designed specifically for your business requirements.",
    "features.version.history": "Version",
    "features.version.history.subtitle": "History",
    "features.coming.soon": "Coming Soon in v2.1.0",
    "features.coming.description":
      "We have ambitious plans to revolutionize AI-powered development. Our upcoming features will include advanced neural networks, real-time collaboration tools, and enhanced automation capabilities that will transform how you work with AI.",

    // Terms
    "terms.title.main": "Terms",
    "terms.title.sub": "of Service",
    "terms.interpretation.title": "Interpretation and Definitions",
    "terms.interpretation.subtitle": "Interpretation",
    "terms.interpretation.content":
      "Words with capitalized initial letters have specific meanings defined here. These definitions apply consistently, whether used in singular or plural form.",
    "terms.definitions.title": "Definitions",
    "terms.definitions.application.title": "Application",
    "terms.definitions.application.content":
      "Thrive AI Studio services provided by the Company, accessible through any device.",
    "terms.definitions.company.title": "Company",
    "terms.definitions.company.content": 'Developers of Thrive AI Studio, referred to as "We", "Us", or "Our".',
    "terms.definitions.service.title": "Service",
    "terms.definitions.service.content": "AI-powered development tools provided by Thrive AI Studio.",
    "terms.definitions.you.title": "You",
    "terms.definitions.you.content": "The individual or entity accessing or using the Service.",
    "terms.acknowledgment.title": "Acknowledgment",
    "terms.acknowledgment.content":
      "These Terms govern your use of the Service and form an agreement between You and the Company. By using the Service, You agree to these Terms. If You disagree, You may not use the Service. You must be over 18 to use the Service. Your use is also subject to our Privacy Policy.",
    "terms.subscriptions.title": "Subscriptions",
    "terms.subscriptions.period.title": "Subscription Period",
    "terms.subscriptions.period.content":
      "Subscriptions require advance billing on a recurring basis (monthly or annually). They auto-renew unless canceled.",
    "terms.subscriptions.cancellation.title": "Subscription Cancellations",
    "terms.subscriptions.cancellation.content":
      "Cancel through Your Account settings or contact Us. No refunds for current period fees. Access continues until the end of the current period.",
    "terms.subscriptions.fees.title": "Fee Changes",
    "terms.subscriptions.fees.content":
      "Subscription fees may change. We will notify You in advance. Continued use after the change implies agreement to the new fee.",
    "terms.ip.title": "Intellectual Property",
    "terms.ip.content":
      "The Service and its original content are the property of the Company and its licensors, protected by copyright, trademark, and other laws.",
    "terms.liability.title": "Limitation of Liability",
    "terms.liability.content":
      "The Company is not liable for any indirect, incidental, or consequential damages related to the use of the Service.",
    "terms.contact.title": "Contact Us",
    "terms.contact.content": "For questions, you can contact us at:",
    "terms.contact.email": "By email",

    // Privacy
    "privacy.title.main": "Privacy",
    "privacy.title.sub": "Policy",
    "privacy.collect.title": "Information We Collect",
    "privacy.collect.content":
      "We collect information you provide directly to us, such as when you create an account, use our AI services, or contact us for support. This includes your name, email address, project data, and usage patterns to improve our AI algorithms.",
    "privacy.use.title": "How We Use Your Information",
    "privacy.use.intro": "We use the information we collect to",
    "privacy.use.item1": "Provide, maintain, and improve our AI-powered services",
    "privacy.use.item2": "Process transactions and send related information",
    "privacy.use.item3": "Send technical notices, updates, and support messages",
    "privacy.use.item4": "Train and enhance our AI models (with anonymized data)",
    "privacy.use.item5": "Monitor and analyze trends and usage patterns",
    "privacy.security.title": "Data Security",
    "privacy.security.content":
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest using industry-standard protocols.",
    "privacy.ai.title": "AI Model Training",
    "privacy.ai.content":
      "We may use anonymized and aggregated data to improve our AI models and services. Personal identifiers are removed, and individual projects cannot be reconstructed from this training data. You can opt out of this program in your account settings.",
    "privacy.retention.title": "Data Retention",
    "privacy.retention.content":
      "We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time, subject to legal and contractual obligations.",
    "privacy.rights.title": "Your Rights",
    "privacy.rights.intro": "You have the right to",
    "privacy.rights.item1": "Access and receive a copy of your personal data",
    "privacy.rights.item2": "Rectify inaccurate personal data",
    "privacy.rights.item3": "Request deletion of your personal data",
    "privacy.rights.item4": "Object to processing of your personal data",
    "privacy.rights.item5": "Data portability for your personal data",
    "privacy.contact.title": "Contact Information",
    "privacy.contact.content": "For privacy-related inquiries, contact us at:",
    "privacy.contact.email": "Email",
    "privacy.contact.response": "We respond to all requests within 30 days as required by applicable privacy laws.",
    "privacy.updates.title": "Updates to This Policy",
    "privacy.updates.content":
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
  },
  zh: {
    // Header
    "nav.home": "首页",
    "nav.features": "功能",
    "nav.terms": "条款",
    "nav.privacy": "隐私政策",

    // Hero
    "hero.title": "Thrive",
    "hero.subtitle": "通过AI赋能创新",
    "hero.description":
      "我们创建前沿的AI应用程序，将想法转化为现实。我们的工作室专注于构建智能系统，推动业务增长并提升用户体验。",
    "hero.cta": "查看我们的作品",

    // Features
    "features.title": "AI驱动的",
    "features.subtitle": "功能",
    "features.description": "探索我们前沿的AI能力和平台的最新增强功能",
    "features.ai.title": "AI驱动的自动化",
    "features.ai.description": "根据您的特定需求和使用模式进行适应和优化的智能工作流程。",
    "features.interface.title": "智能界面设计",
    "features.interface.description": "更清洁、更直观的用户界面，具有AI驱动的个性化和自适应布局。",
    "features.analytics.title": "高级分析",
    "features.analytics.description": "深度洞察和性能指标，配备AI驱动的优化建议。",
    "features.models.title": "定制AI模型",
    "features.models.description": "专门为您的业务需求设计的定制机器学习模型。",
    "features.version.history": "版本",
    "features.version.history.subtitle": "历史",
    "features.coming.soon": "v2.1.0即将推出",
    "features.coming.description":
      "我们有雄心勃勃的计划来革命化AI驱动的开发。我们即将推出的功能将包括先进的神经网络、实时协作工具和增强的自动化功能，这将改变您与AI的工作方式。",

    // Terms
    "terms.title.main": "服务",
    "terms.title.sub": "条款",
    "terms.interpretation.title": "解释和定义",
    "terms.interpretation.subtitle": "解释",
    "terms.interpretation.content":
      "首字母大写的词语具有此处定义的特定含义。这些定义无论以单数还是复数形式使用都一致适用。",
    "terms.definitions.title": "定义",
    "terms.definitions.application.title": "应用程序",
    "terms.definitions.application.content": "公司提供的Thrive AI Studio服务，可通过任何设备访问。",
    "terms.definitions.company.title": "公司",
    "terms.definitions.company.content": 'Thrive AI Studio的开发者，称为"我们"、"我们的"或"本公司"。',
    "terms.definitions.service.title": "服务",
    "terms.definitions.service.content": "Thrive AI Studio提供的AI驱动开发工具。",
    "terms.definitions.you.title": "您",
    "terms.definitions.you.content": "访问或使用服务的个人或实体。",
    "terms.acknowledgment.title": "确认",
    "terms.acknowledgment.content":
      "这些条款管理您对服务的使用，并构成您与公司之间的协议。通过使用服务，您同意这些条款。如果您不同意，您不得使用服务。您必须年满18岁才能使用服务。您的使用还受我们隐私政策的约束。",
    "terms.subscriptions.title": "订阅",
    "terms.subscriptions.period.title": "订阅期",
    "terms.subscriptions.period.content": "订阅需要按定期（月度或年度）预付费用。除非取消，否则会自动续订。",
    "terms.subscriptions.cancellation.title": "订阅取消",
    "terms.subscriptions.cancellation.content":
      "通过您的账户设置取消或联系我们。当前期间费用不予退还。访问权限持续到当前期间结束。",
    "terms.subscriptions.fees.title": "费用变更",
    "terms.subscriptions.fees.content": "订阅费用可能会发生变化。我们会提前通知您。变更后继续使用意味着同意新费用。",
    "terms.ip.title": "知识产权",
    "terms.ip.content": "服务及其原创内容是公司及其许可方的财产，受版权、商标和其他法律保护。",
    "terms.liability.title": "责任限制",
    "terms.liability.content": "公司不对与使用服务相关的任何间接、偶然或后果性损害承担责任。",
    "terms.contact.title": "联系我们",
    "terms.contact.content": "如有疑问，您可以通过以下方式联系我们：",
    "terms.contact.email": "电子邮件",

    // Privacy
    "privacy.title.main": "隐私",
    "privacy.title.sub": "政策",
    "privacy.collect.title": "我们收集的信息",
    "privacy.collect.content":
      "我们收集您直接提供给我们的信息，例如当您创建账户、使用我们的AI服务或联系我们寻求支持时。这包括您的姓名、电子邮件地址、项目数据和使用模式，以改进我们的AI算法。",
    "privacy.use.title": "我们如何使用您的信息",
    "privacy.use.intro": "我们使用收集的信息来",
    "privacy.use.item1": "提供、维护和改进我们的AI驱动服务",
    "privacy.use.item2": "处理交易并发送相关信息",
    "privacy.use.item3": "发送技术通知、更新和支持消息",
    "privacy.use.item4": "训练和增强我们的AI模型（使用匿名数据）",
    "privacy.use.item5": "监控和分析趋势和使用模式",
    "privacy.security.title": "数据安全",
    "privacy.security.content":
      "我们实施适当的技术和组织安全措施，以保护您的个人信息免受未经授权的访问、更改、披露或破坏。所有数据在传输和静态存储时都使用行业标准协议进行加密。",
    "privacy.ai.title": "AI模型训练",
    "privacy.ai.content":
      "我们可能使用匿名和聚合数据来改进我们的AI模型和服务。个人标识符会被删除，无法从此训练数据中重构个别项目。您可以在账户设置中选择退出此程序。",
    "privacy.retention.title": "数据保留",
    "privacy.retention.content":
      "我们会在您的账户处于活跃状态期间或根据提供服务的需要保留您的个人信息。您可以随时请求删除您的数据，但需遵守法律和合同义务。",
    "privacy.rights.title": "您的权利",
    "privacy.rights.intro": "您有权",
    "privacy.rights.item1": "访问并获得您个人数据的副本",
    "privacy.rights.item2": "纠正不准确的个人数据",
    "privacy.rights.item3": "请求删除您的个人数据",
    "privacy.rights.item4": "反对处理您的个人数据",
    "privacy.rights.item5": "您个人数据的数据可携性",
    "privacy.contact.title": "联系信息",
    "privacy.contact.content": "如有隐私相关询问，请联系我们：",
    "privacy.contact.email": "电子邮件",
    "privacy.contact.response": "我们会在适用隐私法律要求的30天内回复所有请求。",
    "privacy.updates.title": "政策更新",
    "privacy.updates.content":
      '我们可能会不时更新此隐私政策。我们会通过在此页面发布新的隐私政策并更新"最后更新"日期来通知您任何更改。',
  },
  ja: {
    // Header
    "nav.home": "ホーム",
    "nav.features": "機能",
    "nav.terms": "利用規約",
    "nav.privacy": "プライバシーポリシー",

    // Hero
    "hero.title": "Thrive",
    "hero.subtitle": "AIによるイノベーションの促進",
    "hero.description":
      "アイデアを現実に変える最先端のAIアプリケーションを作成します。私たちのスタジオは、ビジネスの成長を促進し、ユーザーエクスペリエンスを向上させるインテリジェントシステムの構築を専門としています。",
    "hero.cta": "私たちの作品を見る",

    // Features
    "features.title": "AI駆動の",
    "features.subtitle": "機能",
    "features.description": "最先端のAI機能とプラットフォームの最新の拡張機能をご覧ください",
    "features.ai.title": "AI駆動の自動化",
    "features.ai.description":
      "お客様の特定のニーズと使用パターンに基づいて適応し最適化するインテリジェントワークフロー。",
    "features.interface.title": "スマートインターフェースデザイン",
    "features.interface.description":
      "AI駆動のパーソナライゼーションとアダプティブレイアウトを備えた、よりクリーンで直感的なユーザーインターフェース。",
    "features.analytics.title": "高度な分析",
    "features.analytics.description": "最適化のためのAI駆動の推奨事項を備えた深い洞察とパフォーマンスメトリクス。",
    "features.models.title": "カスタムAIモデル",
    "features.models.description": "お客様のビジネス要件に特化して設計されたカスタマイズされた機械学習モデル。",
    "features.version.history": "バージョン",
    "features.version.history.subtitle": "履歴",
    "features.coming.soon": "v2.1.0で近日公開",
    "features.coming.description":
      "AI駆動の開発を革命化する野心的な計画があります。今後の機能には、高度なニューラルネットワーク、リアルタイムコラボレーションツール、AIとの作業方法を変革する拡張された自動化機能が含まれます。",

    // Terms
    "terms.title.main": "利用",
    "terms.title.sub": "規約",
    "terms.interpretation.title": "解釈と定義",
    "terms.interpretation.subtitle": "解釈",
    "terms.interpretation.content":
      "大文字で始まる単語は、ここで定義された特定の意味を持ちます。これらの定義は、単数形または複数形で使用されるかどうかに関係なく一貫して適用されます。",
    "terms.definitions.title": "定義",
    "terms.definitions.application.title": "アプリケーション",
    "terms.definitions.application.content": "会社が提供するThrive AI Studioサービス。任意のデバイスからアクセス可能。",
    "terms.definitions.company.title": "会社",
    "terms.definitions.company.content": "Thrive AI Studioの開発者。「私たち」、「当社」、または「弊社」と呼ばれます。",
    "terms.definitions.service.title": "サービス",
    "terms.definitions.service.content": "Thrive AI Studioが提供するAI駆動開発ツール。",
    "terms.definitions.you.title": "あなた",
    "terms.definitions.you.content": "サービスにアクセスまたは使用する個人または団体。",
    "terms.acknowledgment.title": "承認",
    "terms.acknowledgment.content":
      "これらの規約はサービスの使用を管理し、あなたと会社との間の合意を形成します。サービスを使用することにより、これらの規約に同意したものとみなされます。同意しない場合は、サービスを使用できません。サービスを使用するには18歳以上である必要があります。使用は当社のプライバシーポリシーにも従います。",
    "terms.subscriptions.title": "サブスクリプション",
    "terms.subscriptions.period.title": "サブスクリプション期間",
    "terms.subscriptions.period.content":
      "サブスクリプションは定期的（月次または年次）な前払い請求が必要です。キャンセルされない限り自動更新されます。",
    "terms.subscriptions.cancellation.title": "サブスクリプションのキャンセル",
    "terms.subscriptions.cancellation.content":
      "アカウント設定からキャンセルするか、お問い合わせください。現在の期間の料金は返金されません。現在の期間の終了まで利用可能です。",
    "terms.subscriptions.fees.title": "料金変更",
    "terms.subscriptions.fees.content":
      "サブスクリプション料金は変更される場合があります。事前に通知いたします。変更後の継続使用は新料金への同意を意味します。",
    "terms.ip.title": "知的財産",
    "terms.ip.content":
      "サービスとその独自コンテンツは、会社とそのライセンサーの財産であり、著作権、商標、その他の法律によって保護されています。",
    "terms.liability.title": "責任の制限",
    "terms.liability.content":
      "会社は、サービスの使用に関連する間接的、偶発的、または結果的損害について責任を負いません。",
    "terms.contact.title": "お問い合わせ",
    "terms.contact.content": "ご質問がございましたら、以下までお問い合わせください：",
    "terms.contact.email": "メール",

    // Privacy
    "privacy.title.main": "プライバシー",
    "privacy.title.sub": "ポリシー",
    "privacy.collect.title": "収集する情報",
    "privacy.collect.content":
      "アカウント作成時、AIサービス利用時、サポートへのお問い合わせ時など、お客様が直接提供する情報を収集します。これには、お名前、メールアドレス、プロジェクトデータ、AIアルゴリズム改善のための使用パターンが含まれます。",
    "privacy.use.title": "情報の使用方法",
    "privacy.use.intro": "収集した情報は以下の目的で使用します",
    "privacy.use.item1": "AI駆動サービスの提供、維持、改善",
    "privacy.use.item2": "取引の処理と関連情報の送信",
    "privacy.use.item3": "技術的通知、更新、サポートメッセージの送信",
    "privacy.use.item4": "AIモデルの訓練と強化（匿名化データを使用）",
    "privacy.use.item5": "トレンドと使用パターンの監視と分析",
    "privacy.security.title": "データセキュリティ",
    "privacy.security.content":
      "不正アクセス、改変、開示、破壊からお客様の個人情報を保護するため、適切な技術的・組織的セキュリティ対策を実施しています。すべてのデータは業界標準プロトコルを使用して転送時および保存時に暗号化されます。",
    "privacy.ai.title": "AIモデル訓練",
    "privacy.ai.content":
      "AIモデルとサービスの改善のため、匿名化・集約化されたデータを使用する場合があります。個人識別子は削除され、この訓練データから個別のプロジェクトを再構築することはできません。アカウント設定でこのプログラムからオプトアウトできます。",
    "privacy.retention.title": "データ保持",
    "privacy.retention.content":
      "アカウントがアクティブである限り、またはサービス提供に必要な限り、個人情報を保持します。法的・契約上の義務に従い、いつでもデータの削除を要求できます。",
    "privacy.rights.title": "お客様の権利",
    "privacy.rights.intro": "お客様には以下の権利があります",
    "privacy.rights.item1": "個人データへのアクセスとコピーの受領",
    "privacy.rights.item2": "不正確な個人データの修正",
    "privacy.rights.item3": "個人データの削除要求",
    "privacy.rights.item4": "個人データの処理への異議申し立て",
    "privacy.rights.item5": "個人データのデータポータビリティ",
    "privacy.contact.title": "連絡先情報",
    "privacy.contact.content": "プライバシーに関するお問い合わせは以下までご連絡ください：",
    "privacy.contact.email": "メール",
    "privacy.contact.response": "適用されるプライバシー法に従い、30日以内にすべてのリクエストに回答いたします。",
    "privacy.updates.title": "ポリシーの更新",
    "privacy.updates.content":
      "このプライバシーポリシーは随時更新される場合があります。変更がある場合は、このページに新しいプライバシーポリシーを掲載し、「最終更新」日を更新してお知らせします。",
  },
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.features": "Características",
    "nav.terms": "Términos",
    "nav.privacy": "Política de Privacidad",

    // Hero
    "hero.title": "Thrive",
    "hero.subtitle": "Potenciando la Innovación a través de IA",
    "hero.description":
      "Creamos aplicaciones de IA de vanguardia que transforman ideas en realidad. Nuestro estudio se especializa en construir sistemas inteligentes que impulsan el crecimiento empresarial y mejoran las experiencias de usuario.",
    "hero.cta": "Ver Nuestro Trabajo",

    // Features
    "features.title": "Impulsado por IA",
    "features.subtitle": "Características",
    "features.description":
      "Descubre nuestras capacidades de IA de vanguardia y las últimas mejoras de nuestra plataforma",
    "features.ai.title": "Automatización Impulsada por IA",
    "features.ai.description":
      "Flujos de trabajo inteligentes que se adaptan y optimizan según sus necesidades específicas y patrones de uso.",
    "features.interface.title": "Diseño de Interfaz Inteligente",
    "features.interface.description":
      "Interfaces de usuario más limpias e intuitivas con personalización impulsada por IA y diseños adaptativos.",
    "features.analytics.title": "Análisis Avanzado",
    "features.analytics.description":
      "Perspectivas profundas y métricas de rendimiento con recomendaciones impulsadas por IA para optimización.",
    "features.models.title": "Modelos de IA Personalizados",
    "features.models.description":
      "Modelos de aprendizaje automático personalizados diseñados específicamente para sus requisitos comerciales.",
    "features.version.history": "Historial de",
    "features.version.history.subtitle": "Versiones",
    "features.coming.soon": "Próximamente en v2.1.0",
    "features.coming.description":
      "Tenemos planes ambiciosos para revolucionar el desarrollo impulsado por IA. Nuestras próximas características incluirán redes neuronales avanzadas, herramientas de colaboración en tiempo real y capacidades de automatización mejoradas que transformarán cómo trabajas con IA.",

    // Terms
    "terms.title.main": "Términos",
    "terms.title.sub": "de Servicio",
    "terms.interpretation.title": "Interpretación y Definiciones",
    "terms.interpretation.subtitle": "Interpretación",
    "terms.interpretation.content":
      "Las palabras con letras iniciales en mayúscula tienen significados específicos definidos aquí. Estas definiciones se aplican consistentemente, ya sea que se usen en forma singular o plural.",
    "terms.definitions.title": "Definiciones",
    "terms.definitions.application.title": "Aplicación",
    "terms.definitions.application.content":
      "Servicios de Thrive AI Studio proporcionados por la Empresa, accesibles a través de cualquier dispositivo.",
    "terms.definitions.company.title": "Empresa",
    "terms.definitions.company.content":
      'Desarrolladores de Thrive AI Studio, referidos como "Nosotros", "Nos", o "Nuestra".',
    "terms.definitions.service.title": "Servicio",
    "terms.definitions.service.content":
      "Herramientas de desarrollo impulsadas por IA proporcionadas por Thrive AI Studio.",
    "terms.definitions.you.title": "Usted",
    "terms.definitions.you.content": "El individuo o entidad que accede o usa el Servicio.",
    "terms.acknowledgment.title": "Reconocimiento",
    "terms.acknowledgment.content":
      "Estos Términos rigen su uso del Servicio y forman un acuerdo entre Usted y la Empresa. Al usar el Servicio, Usted acepta estos Términos. Si no está de acuerdo, no puede usar el Servicio. Debe ser mayor de 18 años para usar el Servicio. Su uso también está sujeto a nuestra Política de Privacidad.",
    "terms.subscriptions.title": "Suscripciones",
    "terms.subscriptions.period.title": "Período de Suscripción",
    "terms.subscriptions.period.content":
      "Las suscripciones requieren facturación anticipada de forma recurrente (mensual o anual). Se renuevan automáticamente a menos que se cancelen.",
    "terms.subscriptions.cancellation.title": "Cancelaciones de Suscripción",
    "terms.subscriptions.cancellation.content":
      "Cancele a través de la configuración de Su Cuenta o contáctenos. No hay reembolsos por las tarifas del período actual. El acceso continúa hasta el final del período actual.",
    "terms.subscriptions.fees.title": "Cambios de Tarifas",
    "terms.subscriptions.fees.content":
      "Las tarifas de suscripción pueden cambiar. Le notificaremos con anticipación. El uso continuado después del cambio implica acuerdo con la nueva tarifa.",
    "terms.ip.title": "Propiedad Intelectual",
    "terms.ip.content":
      "El Servicio y su contenido original son propiedad de la Empresa y sus licenciantes, protegidos por derechos de autor, marcas comerciales y otras leyes.",
    "terms.liability.title": "Limitación de Responsabilidad",
    "terms.liability.content":
      "La Empresa no es responsable de ningún daño indirecto, incidental o consecuencial relacionado con el uso del Servicio.",
    "terms.contact.title": "Contáctanos",
    "terms.contact.content": "Para preguntas, puede contactarnos en:",
    "terms.contact.email": "Por correo electrónico",

    // Privacy
    "privacy.title.main": "Política",
    "privacy.title.sub": "de Privacidad",
    "privacy.collect.title": "Información que Recopilamos",
    "privacy.collect.content":
      "Recopilamos información que nos proporciona directamente, como cuando crea una cuenta, usa nuestros servicios de IA o nos contacta para soporte. Esto incluye su nombre, dirección de correo electrónico, datos del proyecto y patrones de uso para mejorar nuestros algoritmos de IA.",
    "privacy.use.title": "Cómo Usamos Su Información",
    "privacy.use.intro": "Usamos la información que recopilamos para",
    "privacy.use.item1": "Proporcionar, mantener y mejorar nuestros servicios impulsados por IA",
    "privacy.use.item2": "Procesar transacciones y enviar información relacionada",
    "privacy.use.item3": "Enviar avisos técnicos, actualizaciones y mensajes de soporte",
    "privacy.use.item4": "Entrenar y mejorar nuestros modelos de IA (con datos anonimizados)",
    "privacy.use.item5": "Monitorear y analizar tendencias y patrones de uso",
    "privacy.security.title": "Seguridad de Datos",
    "privacy.security.content":
      "Implementamos medidas de seguridad técnicas y organizacionales apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Todos los datos están encriptados en tránsito y en reposo usando protocolos estándar de la industria.",
    "privacy.ai.title": "Entrenamiento de Modelos de IA",
    "privacy.ai.content":
      "Podemos usar datos anonimizados y agregados para mejorar nuestros modelos de IA y servicios. Los identificadores personales se eliminan, y los proyectos individuales no pueden reconstruirse a partir de estos datos de entrenamiento. Puede optar por no participar en este programa en la configuración de su cuenta.",
    "privacy.retention.title": "Retención de Datos",
    "privacy.retention.content":
      "Retenemos su información personal mientras su cuenta esté activa o según sea necesario para proporcionar servicios. Puede solicitar la eliminación de sus datos en cualquier momento, sujeto a obligaciones legales y contractuales.",
    "privacy.rights.title": "Sus Derechos",
    "privacy.rights.intro": "Usted tiene derecho a",
    "privacy.rights.item1": "Acceder y recibir una copia de sus datos personales",
    "privacy.rights.item2": "Rectificar datos personales inexactos",
    "privacy.rights.item3": "Solicitar la eliminación de sus datos personales",
    "privacy.rights.item4": "Objetar el procesamiento de sus datos personales",
    "privacy.rights.item5": "Portabilidad de datos para sus datos personales",
    "privacy.contact.title": "Información de Contacto",
    "privacy.contact.content": "Para consultas relacionadas con privacidad, contáctenos en:",
    "privacy.contact.email": "Correo electrónico",
    "privacy.contact.response":
      "Respondemos a todas las solicitudes dentro de 30 días según lo requerido por las leyes de privacidad aplicables.",
    "privacy.updates.title": "Actualizaciones de Esta Política",
    "privacy.updates.content":
      'Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos de cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de "Última Actualización".',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
