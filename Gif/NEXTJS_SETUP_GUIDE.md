# 🚀 Next.js 版本设置和测试指南

由于 Dropbox 云同步目录的权限限制，建议在本地非云同步目录创建项目。

## 方法1: 快速测试（推荐）

### 1. 在本地目录创建项目

```bash
# 在用户目录创建
cd ~
npx create-next-app@latest sprite-gif-test --typescript --tailwind --app --no-src-dir
cd sprite-gif-test
```

### 2. 安装 Shadcn UI

```bash
npx shadcn-ui@latest init
```

选择配置：
- TypeScript: Yes
- Style: Default  
- Base color: Slate
- CSS variables: Yes

### 3. 添加需要的组件

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
```

### 4. 复制代码

将以下目录的内容复制到新项目：

**从原HTML版本复制：**
- 复制 `step1-generate-sprite.html` 的逻辑到 `app/page.tsx`
- 复制 `sprite-to-gif.html` 的逻辑到 `app/generate-gif/page.tsx`
- 内嵌 GIF 编码器到 `lib/gif-encoder.ts`

### 5. 启动测试

```bash
npm run dev
```

访问 http://localhost:3000

---

## 方法2: 使用已创建的项目（需要手动修复）

```bash
cd /Users/yosign/Library/CloudStorage/Dropbox/Github/Gif/sprite-gif-nextjs

# 删除 node_modules 和重新安装
rm -rf node_modules package-lock.json
npm install

# 尝试启动
npm run dev
```

如果遇到权限问题，将整个项目复制到非 Dropbox 目录：

```bash
cp -r /Users/yosign/Library/CloudStorage/Dropbox/Github/Gif/sprite-gif-nextjs ~/sprite-gif-nextjs
cd ~/sprite-gif-nextjs
npm install
npm run dev
```

---

## 关键文件实现

### 1. Dify API 调用 (lib/dify-api.ts)

```typescript
export async function uploadFile(file: File, apiKey: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user', 'user-' + Date.now());

  const response = await fetch('https://api.dify.ai/v1/files/upload', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: formData
  });

  if (!response.ok) {
    throw new Error('文件上传失败');
  }

  const data = await response.json();
  return data.id;
}

export async function generateSprite(
  fileId: string,
  prompt: string,
  style: string,
  size: string,
  apiKey: string,
  endpoint: string
) {
  const requestBody = {
    query: prompt,
    response_mode: 'blocking',
    user: 'user-' + Date.now(),
    inputs: {
      prompt: prompt,
      size: size,
      style: style,
      inputimage: [{
        type: 'image',
        transfer_method: 'local_file',
        upload_file_id: fileId
      }]
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API 请求失败');
  }

  return await response.json();
}
```

### 2. 主页面 (app/page.tsx)

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { uploadFile, generateSprite } from '@/lib/dify-api';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('像素艺术');
  const [size, setSize] = useState('1K');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!file || !apiKey || !prompt) {
      alert('请填写所有必填项');
      return;
    }

    setLoading(true);
    try {
      // 上传文件
      const fileId = await uploadFile(file, apiKey);
      
      // 生成精灵图
      const result = await generateSprite(
        fileId,
        prompt,
        style,
        size,
        apiKey,
        'https://api.dify.ai/v1/chat-messages'
      );
      
      // 提取图片URL并跳转
      const imageUrl = extractImageUrl(result);
      if (imageUrl) {
        sessionStorage.setItem('sprite_image_url', imageUrl);
        window.location.href = '/generate-gif';
      }
    } catch (error) {
      console.error(error);
      alert('生成失败: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">生成精灵图</h1>
        
        {/* 表单内容 */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="apiKey">API Key *</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="输入 Dify API Key"
            />
          </div>

          <div>
            <Label htmlFor="file">上传图片 *</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <Label htmlFor="prompt">提示词 *</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="描述想要生成的精灵图..."
            />
          </div>

          <div>
            <Label>风格</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="像素艺术">像素艺术</SelectItem>
                <SelectItem value="8位像素">8位像素</SelectItem>
                <SelectItem value="16位像素">16位像素</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>尺寸</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1K">1K</SelectItem>
                <SelectItem value="2K">2K</SelectItem>
                <SelectItem value="4K">4K</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full"
          >
            {loading ? '生成中...' : '开始生成'}
          </Button>
        </div>
      </Card>
    </main>
  );
}

function extractImageUrl(response: any): string | null {
  if (response.data?.outputs) {
    return response.data.outputs.image_url || 
           response.data.outputs.imageUrl || 
           response.data.outputs.image;
  }
  if (typeof response.answer === 'string' && response.answer.startsWith('http')) {
    return response.answer;
  }
  return null;
}
```

---

## 🎯 测试检查清单

1. ✅ 项目创建成功
2. ✅ 依赖安装完成
3. ✅ 开发服务器启动
4. ✅ 页面正常显示
5. ✅ Shadcn 组件工作正常
6. ✅ API 调用成功
7. ✅ GIF 生成功能正常

## 📞 需要帮助？

如果遇到问题，请告诉我：
1. 错误信息
2. 当前步骤
3. 浏览器控制台日志

我会帮你解决！

