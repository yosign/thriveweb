# 🎨 Nanobanana Pro 像素精灵图动画工具

这是一个两步式的精灵图动画生成工具，结合了 Dify AI 和本地 GIF 生成功能。

## 📋 功能特性

### 步骤1: 生成精灵图 (`step1-generate-sprite.html`)
- ✅ 上传任意图片
- ✅ 使用 Dify AI 生成像素风格精灵图
- ✅ 支持自定义提示词和风格
- ✅ 自动保存 API 配置
- ✅ 直接跳转到下一步

### 步骤2: 制作 GIF 动画 (`sprite-to-gif.html`)
- ✅ 自动加载生成的精灵图
- ✅ 实时预览动画效果
- ✅ 调整帧率 (1-60 FPS)
- ✅ 缩放比例 (10%-200%)
- ✅ 生成并下载 GIF 动画
- ✅ 完全离线，无需网络

## 🚀 使用流程

### 第一步：生成精灵图

1. 打开 `step1-generate-sprite.html`
2. 配置 Dify API Key 和 Endpoint
3. 上传一张图片（支持拖拽）
4. 输入提示词，例如：
   - "生成一个跑步动作的像素小人，16帧动画"
   - "将这个人物转换为8位像素风格，走路动画"
5. 选择像素风格（可选）
6. 点击"开始生成精灵图"
7. 等待生成完成后，点击"下一步：制作动画"

### 第二步：制作 GIF 动画

1. 精灵图会自动加载（如果从第一步跳转）
2. 调整参数：
   - **帧率**：控制动画播放速度（推荐 8-15 FPS）
   - **缩放比例**：调整输出 GIF 的大小
3. 点击"播放"预览动画效果
4. 点击"生成 GIF"创建动画文件
5. 点击"下载 GIF"保存到本地

## ⚙️ API 配置

### 获取 Dify API Key

1. 访问 [Dify 控制台](https://cloud.dify.ai/)
2. 选择你的应用
3. 进入 API 访问页面
4. 复制 API Key

### API Endpoint

默认使用：`https://api.dify.ai/v1/chat-messages`

如果你使用自部署的 Dify，请修改为你的服务地址。

## 📝 API 请求格式参考

根据 `DIFY_API_INTEGRATION_GUIDE.md` 文档，请求格式如下：

```json
{
  "query": "提示词内容",
  "response_mode": "blocking",
  "user": "user-timestamp",
  "inputs": {
    "prompt": "提示词内容",
    "style": "像素艺术",
    "inputimage": [{
      "type": "image",
      "transfer_method": "local_file",
      "upload_file_id": "上传的文件ID"
    }]
  }
}
```

## 🎯 技术特点

### 完全离线的 GIF 生成
- 内嵌 `gifenc` 库，无需外部依赖
- 纯浏览器端处理，保护隐私
- 实时进度显示

### 简洁的用户体验
- 极简白色风格设计
- 响应式布局
- 清晰的步骤指引
- 详细的错误提示

## 📦 文件结构

```
Gif/
├── step1-generate-sprite.html  # 步骤1: 生成精灵图
├── sprite-to-gif.html          # 步骤2: 制作GIF动画
├── gifenc.js                   # GIF编码库（可选，已内嵌）
├── README.md                   # 使用说明
└── Difyreadme/                 # API集成文档
    ├── DIFY_API_INTEGRATION_GUIDE.md
    ├── dify-api-script.js
    └── dify-image-api.html
```

## 🔧 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 💡 使用技巧

1. **精灵图要求**：
   - 推荐 4x4 的16宫格布局
   - 每帧动作要连贯
   - 图片尺寸建议 1024x1024 或 2048x2048

2. **提示词技巧**：
   - 明确说明帧数（如"16帧"）
   - 描述动作（如"跑步"、"走路"、"跳跃"）
   - 指定风格（如"8位像素"、"复古游戏风格"）

3. **动画优化**：
   - 帧率 8-12 FPS 适合像素动画
   - 过高帧率会增加文件大小
   - 可以先用小缩放比例测试效果

## 🐛 常见问题

### Q: GIF生成失败
A: 确保图片是标准的 4x4 精灵图布局

### Q: API 调用失败
A: 检查：
- API Key 是否正确
- 网络连接是否正常
- 图片大小是否超过 10MB

### Q: 动画不流畅
A: 尝试：
- 调整帧率（降低或提高）
- 检查精灵图每帧是否连贯
- 确认是 4x4 共16帧

## 📄 许可证

MIT License

## 🙏 致谢

- [Dify AI](https://dify.ai/) - AI 工作流平台
- [gifenc](https://github.com/mattdesl/gifenc) - GIF 编码库

