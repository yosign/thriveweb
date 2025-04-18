"use client"

import { useState, useEffect, useRef } from "react"

interface PixelCanvasProps {
  width?: number
  height?: number
  defaultColor?: string
}

// 将hex颜色转换为RGB
const hexToRgb = (hex: string): {r: number, g: number, b: number} => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {r: 0, g: 0, b: 0}
}

// 将RGB转换为hex
const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// 使颜色更深
const darkenColor = (color: string, amount: number = 0.2): string => {
  const rgb = hexToRgb(color)
  return rgbToHex(
    Math.max(0, Math.floor(rgb.r * (1 - amount))),
    Math.max(0, Math.floor(rgb.g * (1 - amount))),
    Math.max(0, Math.floor(rgb.b * (1 - amount)))
  )
}

// 检查颜色是否是rgba格式
const isRgba = (color: string): boolean => {
  return color.startsWith('rgba(')
}

// 从rgba转换为hex
const rgbaToHex = (rgba: string): string => {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
  if (!match) return '#000000'
  return rgbToHex(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
}

export function PixelCanvas({
  width = 32,
  height = 32,
  defaultColor = "transparent"
}: PixelCanvasProps) {
  const [scale, setScale] = useState(0) // 动态计算缩放比例
  const [pixels, setPixels] = useState<string[][]>(() => 
    Array(height).fill(null).map(() => Array(width).fill(defaultColor))
  )
  const [currentColor, setCurrentColor] = useState("#000000")
  const [autoDarken, setAutoDarken] = useState(true) // 自动选择更深颜色
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const effectCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isDrawing = useRef(false)
  const animationFrameId = useRef<number | null>(null)
  const lastTime = useRef<number>(0)
  const hoveredPixel = useRef<{x: number, y: number} | null>(null)

  // 根据容器大小计算缩放比例
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // 设置画布高度为视窗高度的80%
        const viewportHeight = window.innerHeight;
        const targetHeight = viewportHeight * 0.8;
        
        // 计算缩放系数 (需要除以像素画的高度)
        const newScale = Math.floor(targetHeight / height);
        setScale(newScale);
      }
    };

    // 初始化
    updateScale();
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [height]);

  // 绘制主画布内容
  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas || scale === 0) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // 计算实际画布尺寸
    const canvasWidth = width * scale
    const canvasHeight = height * scale
    
    // 调整画布大小
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    
    // 清除画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    
    // 绘制像素
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelColor = pixels[y][x]
        if (pixelColor !== 'transparent') {
          ctx.fillStyle = pixelColor
          ctx.fillRect(
            x * scale, 
            y * scale, 
            scale, 
            scale
          )
        }
      }
    }
    
    // 绘制网格线 (5%透明白线)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    
    for (let x = 0; x <= width; x++) {
      ctx.beginPath()
      ctx.moveTo(x * scale, 0)
      ctx.lineTo(x * scale, canvasHeight)
      ctx.stroke()
    }
    
    for (let y = 0; y <= height; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * scale)
      ctx.lineTo(canvasWidth, y * scale)
      ctx.stroke()
    }
  }
  
  // 绘制效果画布（悬停效果等）
  const drawEffects = (timestamp: number) => {
    const canvas = effectCanvasRef.current
    if (!canvas || scale === 0) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // 调整画布大小
    canvas.width = width * scale
    canvas.height = height * scale
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // 如果有悬停像素，绘制闪烁边框
    if (hoveredPixel.current) {
      const { x, y } = hoveredPixel.current
      const blinkIntensity = Math.sin(timestamp * 0.01) * 0.5 + 0.5
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${blinkIntensity})`
      ctx.lineWidth = 2
      ctx.strokeRect(
        x * scale, 
        y * scale, 
        scale, 
        scale
      )
    }
    
    // 计算时间差，用于像素化转场效果
    const deltaTime = timestamp - lastTime.current
    lastTime.current = timestamp
    
    // 请求下一帧动画
    animationFrameId.current = requestAnimationFrame(drawEffects)
  }

  // 初始渲染和状态变化时重绘
  useEffect(() => {
    if (scale > 0) {
      draw()
    }
  }, [pixels, scale])
  
  // 设置动画循环
  useEffect(() => {
    // 启动动画循环
    animationFrameId.current = requestAnimationFrame(drawEffects)
    
    // 清理动画循环
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [scale])

  // 获取临近像素的主要颜色
  const getNearbyColor = (x: number, y: number): string => {
    // 获取画布中心点
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    
    // 确定当前像素所在的象限
    const isLeftHalf = x < centerX;
    const isTopHalf = y < centerY;
    
    // 根据象限选择对应的临近对角格子
    let targetX: number, targetY: number;
    
    if (isLeftHalf && isTopHalf) {
      // 左上象限 -> 取临近右下格子的颜色
      targetX = x + 1;
      targetY = y + 1;
    } else if (!isLeftHalf && isTopHalf) {
      // 右上象限 -> 取临近左下格子的颜色
      targetX = x - 1;
      targetY = y + 1;
    } else if (isLeftHalf && !isTopHalf) {
      // 左下象限 -> 取临近右上格子的颜色
      targetX = x + 1;
      targetY = y - 1;
    } else {
      // 右下象限 -> 取临近左上格子的颜色
      targetX = x - 1;
      targetY = y - 1;
    }
    
    // 确保坐标在有效范围内
    targetX = Math.max(0, Math.min(targetX, width - 1));
    targetY = Math.max(0, Math.min(targetY, height - 1));
    
    // 获取目标位置的颜色
    const targetColor = pixels[targetY][targetX];
    
    // 如果目标位置是默认颜色（透明），则使用当前颜色并加深
    if (targetColor === defaultColor) {
      return darkenColor(currentColor, 0.3);
    }
    
    // 如果是rgba格式，转换为hex并加深
    if (isRgba(targetColor)) {
      return darkenColor(rgbaToHex(targetColor), 0.3);
    }
    
    // 返回目标位置的颜色，更加深
    return darkenColor(targetColor, 0.3);
  }

  // 处理鼠标/触摸点击
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || scale === 0) return
    
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / scale)
    const y = Math.floor((e.clientY - rect.top) / scale)
    
    if (x >= 0 && x < width && y >= 0 && y < height) {
      setPixels(prev => {
        const newPixels = [...prev]
        // 使用当前选择的颜色填充像素
        newPixels[y][x] = currentColor
        return newPixels
      })
    }
  }

  // 处理鼠标移动
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || scale === 0) return
    
    // 获取悬停的像素坐标
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / scale)
    const y = Math.floor((e.clientY - rect.top) / scale)
    
    if (x >= 0 && x < width && y >= 0 && y < height) {
      hoveredPixel.current = { x, y }
      
      // 如果启用了自动深色，设置更深的颜色
      if (autoDarken) {
        const darkerColor = getNearbyColor(x, y)
        if (darkerColor !== currentColor) {
          setCurrentColor(darkerColor)
        }
      }
      
      // 如果正在绘制，填充该像素
      if (isDrawing.current) {
        handleCanvasClick(e)
      }
    } else {
      hoveredPixel.current = null
    }
  }

  // 鼠标按下开始绘制
  const handleMouseDown = () => {
    isDrawing.current = true
  }

  // 鼠标松开停止绘制
  const handleMouseUp = () => {
    isDrawing.current = false
  }

  // 清除画布
  const clearCanvas = () => {
    setPixels(Array(height).fill(null).map(() => Array(width).fill(defaultColor)))
  }
  
  // 导出像素画为PNG
  const exportImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'pixel-art.png'
    link.href = dataUrl
    link.click()
  }
  
  // 应用像素化效果（Dgrees风格）
  const applyPixelEffect = () => {
    setPixels(prev => {
      const newPixels = [...prev]
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // 随机添加一些噪点
          if (Math.random() > 0.85) {
            const brightness = Math.random() > 0.5 ? 255 : 0
            newPixels[y][x] = `rgb(${brightness}, ${brightness}, ${brightness})`
          }
        }
      }
      return newPixels
    })
  }
  
  // 导入图片并转换为像素
  const importImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const file = files[0]
    const reader = new FileReader()
    
    reader.onload = (event) => {
      if (!event.target || typeof event.target.result !== 'string') return
      
      const img = new Image()
      img.onload = () => {
        // 创建临时canvas来处理图片
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = width
        tempCanvas.height = height
        const tempCtx = tempCanvas.getContext('2d')
        
        if (!tempCtx) return
        
        // 在临时canvas上绘制调整尺寸后的图片
        tempCtx.drawImage(img, 0, 0, width, height)
        
        // 获取像素数据
        const imageData = tempCtx.getImageData(0, 0, width, height)
        const data = imageData.data
        
        // 更新像素状态
        const newPixels = Array(height).fill(null).map(() => Array(width).fill(defaultColor))
        
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4
            const r = data[index]
            const g = data[index + 1]
            const b = data[index + 2]
            const a = data[index + 3]
            
            // 如果像素不是完全透明的
            if (a > 0) {
              newPixels[y][x] = `rgba(${r}, ${g}, ${b}, ${a / 255})`
            }
          }
        }
        
        setPixels(newPixels)
      }
      
      img.src = event.target.result
    }
    
    reader.readAsDataURL(file)
    
    // 清空文件输入，以便相同文件可以再次上传
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  // 触发文件选择对话框
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  
  // 切换自动深色模式
  const toggleAutoDarken = () => {
    setAutoDarken(prev => !prev)
  }

  // 设置默认的Pacman像素
  useEffect(() => {
    // 这里可以预加载一个默认的像素图像数据
    // 例如，如果有一个API端点提供图像数据
    const loadAvatar = async () => {
      try {
        if (typeof window !== 'undefined') {
          const img = new Image();
          img.onload = () => {
            // 创建临时canvas来处理图片
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext('2d');
            
            if (!tempCtx) return;
            
            // 在临时canvas上绘制调整尺寸后的图片
            tempCtx.drawImage(img, 0, 0, width, height);
            
            // 获取像素数据
            const imageData = tempCtx.getImageData(0, 0, width, height);
            const data = imageData.data;
            
            // 更新像素状态
            const newPixels = Array(height).fill(null).map(() => Array(width).fill(defaultColor));
            
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];
                
                // 如果像素不是完全透明的
                if (a > 0) {
                  newPixels[y][x] = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                }
              }
            }
            
            setPixels(newPixels);
          };
          
          // 加载图像
          img.src = '/avatar.png'; // 这是你的像素画图像路径
        }
      } catch (error) {
        console.error('加载默认图片失败:', error);
      }
    };

    loadAvatar();
  }, [width, height, defaultColor]);

  return (
    <div className="flex flex-col items-center w-full" ref={containerRef}>
      <div className="relative flex-1 w-full flex flex-col items-center">
        <div className="relative mb-8">
          {/* 主画布 - 用于绘制像素 */}
          <canvas
            ref={canvasRef}
            className="cursor-crosshair"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ 
              background: 'transparent',
              imageRendering: 'pixelated',
              display: scale > 0 ? 'block' : 'none'
            }}
          />
          
          {/* 效果画布 - 用于绘制悬停效果等，叠加在主画布上 */}
          <canvas
            ref={effectCanvasRef}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ 
              display: scale > 0 ? 'block' : 'none'
            }}
          />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className="flex gap-3 items-center">
            <label htmlFor="color-picker" className="text-white text-sm font-mono">颜色:</label>
            <input
              id="color-picker"
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              className="w-10 h-10 cursor-pointer rounded-full border-2 border-white/20"
            />
          </div>
          
          <button
            onClick={toggleAutoDarken}
            className={`px-4 py-2 bg-transparent border ${autoDarken ? 'border-yellow-500 text-yellow-500' : 'border-gray-500 text-gray-500'} rounded-md hover:bg-yellow-500/10 transition-colors text-sm font-mono`}
            title="启用后，悬停在像素上时会自动选择比临近颜色更深的颜色"
          >
            自动深色: {autoDarken ? '开' : '关'}
          </button>
          
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500/10 transition-colors text-sm font-mono"
          >
            清除
          </button>
          
          <button
            onClick={exportImage}
            className="px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500/10 transition-colors text-sm font-mono"
          >
            导出
          </button>
          
          <button
            onClick={applyPixelEffect}
            className="px-4 py-2 bg-transparent border border-purple-500 text-purple-500 rounded-md hover:bg-purple-500/10 transition-colors text-sm font-mono"
          >
            像素效果
          </button>
          
          <button
            onClick={handleImportClick}
            className="px-4 py-2 bg-transparent border border-green-500 text-green-500 rounded-md hover:bg-green-500/10 transition-colors text-sm font-mono"
          >
            导入图片
          </button>
          
          {/* 隐藏的文件输入框 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={importImage}
            className="hidden"
          />
        </div>
      </div>
    </div>
  )
} 