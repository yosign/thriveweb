# Thrive Studio Website

一个现代化的AI工作室网站，采用Next.js 15构建，具有动态着色器背景、多语言支持和响应式设计。

## 🌟 特性

- **现代化设计**: 采用动态着色器背景和玻璃态效果
- **多语言支持**: 支持英语、中文、日语和西班牙语
- **响应式布局**: 完美适配桌面和移动设备
- **AI主题**: 专为AI工作室设计的主题和内容
- **组件化架构**: 基于shadcn/ui的可重用组件系统
- **TypeScript**: 完整的类型安全支持
- **性能优化**: 使用Next.js 15的最新特性

## 🚀 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui + Radix UI
- **动画**: Framer Motion
- **着色器**: @paper-design/shaders-react
- **字体**: Figtree, Instrument Serif, Geist Mono
- **包管理**: pnpm

## 📁 项目结构

```
ThriveWebsite/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── ui/               # shadcn/ui基础组件
│   ├── features-section.tsx
│   ├── header.tsx
│   ├── hero-content.tsx
│   ├── language-switcher.tsx
│   ├── privacy-section.tsx
│   ├── shader-background.tsx
│   ├── terms-section.tsx
│   └── theme-provider.tsx
├── contexts/             # React上下文
│   └── language-context.tsx
├── hooks/               # 自定义Hooks
├── lib/                # 工具函数
│   └── utils.ts
├── public/             # 静态资源
└── styles/            # 额外样式文件
```

## 🎨 主要组件

### ShaderBackground
- 使用`@paper-design/shaders-react`创建动态网格渐变背景
- 支持鼠标交互效果
- 包含SVG滤镜效果（玻璃效果、粘性效果）

### LanguageContext
- 支持4种语言：英语(en)、中文(zh)、日语(ja)、西班牙语(es)
- 完整的翻译系统
- 类型安全的翻译函数

### Header
- 响应式导航菜单
- 语言切换器
- 平滑滚动导航

### HeroContent
- 主要着陆区域
- 支持多语言内容
- 交互式按钮

### FeaturesSection
- 展示AI功能特性
- 版本历史展示
- 即将推出的功能预览

## 🛠️ 开发

### 环境要求
- Node.js 18+
- pnpm (推荐)

### 安装依赖
```bash
pnpm install
```

### 开发服务器
```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
pnpm build
```

### 启动生产服务器
```bash
pnpm start
```

### 代码检查
```bash
pnpm lint
```

## 🌍 多语言支持

项目支持以下语言：
- 🇺🇸 English (en) - 默认语言
- 🇨🇳 简体中文 (zh)
- 🇯🇵 日本語 (ja)
- 🇪🇸 Español (es)

语言切换通过`LanguageContext`实现，所有文本内容都存储在`contexts/language-context.tsx`中的`translations`对象中。

### 添加新语言

1. 在`translations`对象中添加新的语言键
2. 翻译所有必要的文本键
3. 在`Language`类型中添加新的语言代码
4. 更新`LanguageSwitcher`组件

## 🎯 页面结构

网站包含以下主要部分：

1. **Hero Section** - 主要着陆区域，包含标题和CTA按钮
2. **Features Section** - AI功能展示和版本历史
3. **Terms Section** - 服务条款
4. **Privacy Section** - 隐私政策

所有部分都支持平滑滚动导航和多语言内容。

## 🔧 配置

### Next.js配置
- 启用图片优化
- 忽略构建时的ESLint和TypeScript错误（用于快速开发）
- 支持静态导出

### Tailwind CSS
- 使用CSS变量进行主题定制
- 集成shadcn/ui组件系统
- 自定义动画和过渡效果

### TypeScript
- 严格类型检查
- 路径别名配置 (`@/*`)
- 增量编译支持

## 📦 主要依赖

### 核心框架
- `next`: 15.2.4 - React框架
- `react`: 19 - React库
- `typescript`: 5 - TypeScript支持

### UI和样式
- `@radix-ui/*`: Radix UI组件
- `tailwindcss`: 4.1.9 - 原子化CSS
- `framer-motion`: 动画库
- `@paper-design/shaders-react`: 着色器效果

### 工具库
- `clsx`: 条件类名
- `tailwind-merge`: Tailwind类名合并
- `lucide-react`: 图标库

## 🚀 部署

项目配置为支持静态导出，可以部署到任何静态托管服务：

1. **Vercel** (推荐)
   ```bash
   pnpm build
   ```

2. **Netlify**
   ```bash
   pnpm build
   ```

3. **GitHub Pages**
   ```bash
   pnpm build
   # 部署 out/ 目录
   ```

## 🎨 设计系统

### 颜色方案
- 主要背景：黑色 (#000000)
- 主要文本：白色及其透明度变体
- 强调色：蓝色和紫色渐变
- 玻璃态效果：白色半透明

### 字体
- **主要字体**: Figtree (300-700)
- **装饰字体**: Instrument Serif (斜体)
- **等宽字体**: Geist Mono

### 响应式断点
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🔍 SEO优化

- 语义化HTML结构
- 优化的meta标签
- 响应式图片
- 快速加载时间
- 可访问性支持

## 📱 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 🤝 贡献

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用MIT许可证。查看 [LICENSE](LICENSE) 文件了解详情。

## 👥 作者

Thrive Studio - AI驱动的创新工作室

---

*使用 ❤️ 和 Next.js 构建*
