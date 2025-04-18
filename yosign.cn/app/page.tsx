"use client"

import { useState, useEffect } from "react"
import LiquidLogo from "@/liquid-logo"
import { Navbar } from "@/components/Navbar"
import Image from "next/image"
import { FullPageScroll } from "@/components/FullPageScroll"
import { PixelCanvas } from "@/components/PixelCanvas"

// 预加载图片数据，将blob转换为base64数据URL
const loadDefaultImage = async () => {
  try {
    const response = await fetch('/api/default-pixel-image')
    if (!response.ok) return null
    const data = await response.json()
    return data.imageData
  } catch (error) {
    console.error('加载默认图片失败:', error)
    return null
  }
}

export default function Home() {
  const [patternScale, setPatternScale] = useState(2)
  const [refraction, setRefraction] = useState(0.015)
  const [edge, setEdge] = useState(0.4)
  const [patternBlur, setPatternBlur] = useState(0.005)
  const [liquid, setLiquid] = useState(0.07)
  const [speed, setSpeed] = useState(0.3)
  const [defaultImageData, setDefaultImageData] = useState<string | null>(null)

  // 加载默认图片
  useEffect(() => {
    // 如果在客户端，直接使用图片URL
    setDefaultImageData('/avatar.png') // 使用静态资源路径
  }, [])

  return (
    <div className="relative bg-[#1F2021]">
      <Navbar />
      <FullPageScroll>
        {/* 第一页 - Logo */}
        <section className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4">
          <div className="w-full max-w-md aspect-square">
            <LiquidLogo
              imageUrl="/logo.svg"
              patternScale={patternScale}
              refraction={refraction}
              edge={edge}
              patternBlur={patternBlur}
              liquid={liquid}
              speed={speed}
            />
          </div>
          <div className="mt-4">
            <Image
              src="/yosignfont.svg"
              alt="Yosign"
              width={300}
              height={100}
              className="brightness-0 invert"
              priority
            />
          </div>
        </section>

        {/* 第二页 - 像素画编辑器 - 参考Dgrees风格 */}
        <section className="w-full h-full flex items-center px-4 relative overflow-hidden">
          {/* 左侧标题 */}
          <div className="absolute top-16 left-16 md:left-24 z-10">
            <div className="mb-4 text-gray-500 font-mono tracking-wider">
              <span className="text-xl">01</span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-6 max-w-md leading-tight">
              Giving<br />Our<br />Best
            </h2>
          </div>
          
          {/* 居中像素画区 */}
          <div className="w-full flex justify-center items-center h-full">
            <div className="w-full max-w-2xl flex flex-col items-center">
              <PixelCanvas />
            </div>
          </div>
        </section>

        {/* 第三页 - 介绍 */}
        <section className="text-white max-w-3xl mx-auto px-8">
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">关于我们</h2>
            <p className="text-lg mb-4">
              Yosign 是一个专注于数字签名和电子合同的平台，提供安全、便捷的电子签名解决方案。
              我们致力于为企业和个人提供高效的合同签署体验，帮助您简化流程，提高效率。
            </p>
            <p className="text-lg">
              我们的技术支持多种签名方式，确保签名的法律效力和安全性，同时符合国际和国内的电子签名标准法规。
            </p>
          </div>
        </section>

        {/* 第四页 - 服务 */}
        <section className="text-white max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">我们的服务</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">电子签名</h3>
              <p>安全、合规的电子签名解决方案，支持多种签名方式和验证机制。</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">合同管理</h3>
              <p>全流程的合同管理系统，从起草、审批到签署、存档，一站式解决。</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">身份认证</h3>
              <p>多重身份验证技术，确保签名身份真实可靠，防止欺诈。</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">API集成</h3>
              <p>提供丰富的API接口，轻松集成到您现有的系统和工作流程中。</p>
            </div>
          </div>
        </section>

        {/* 第五页 - 联系我们 */}
        <section className="text-white max-w-2xl mx-auto px-8">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-8 text-center">联系我们</h2>
            <p className="mb-6 text-center">
              我们期待与您取得联系，了解您的需求并提供最适合的解决方案
            </p>
            <div className="flex flex-col items-center justify-center space-y-4">
              <p><span className="font-semibold">电子邮件：</span> contact@yosign.cn</p>
              <p><span className="font-semibold">电话：</span> +86 123 4567 8910</p>
              <p><span className="font-semibold">地址：</span> 中国上海市浦东新区创新路99号</p>
            </div>
          </div>
        </section>
      </FullPageScroll>
    </div>
  )
}
