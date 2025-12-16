# Dify API 集成指南 (Nanobanana Pro 图生图)

本文档记录了与 Dify "Nanobanana Pro 图生图工具流" 成功交互的正确 API 请求结构和数据格式。

## 1. 核心流程

交互分为两个步骤：
1. **上传图片**：将本地图片上传到 Dify 服务器，获取文件 ID。
2. **执行工作流**：调用 Chat Messages 接口，传入文件 ID 和其他参数生成图片。

---

## 2. 步骤一：上传文件

**接口地址**: `POST https://api.dify.ai/v1/files/upload`
**认证方式**: Header `Authorization: Bearer {API_KEY}`

### 请求参数 (FormData)

| 参数名 | 类型 | 描述 |
| :--- | :--- | :--- |
| `file` | File | 二进制文件对象 (image/*) |
| `user` | String | 用户标识 (如 "user-123") |

### 成功响应示例

```json
{
  "id": "upload_file_id_123",
  "name": "image.png",
  "size": 1024,
  "extension": "png",
  "mime_type": "image/png",
  "created_by": "..."
}
```

---

## 3. 步骤二：执行生成 (关键)

**接口地址**: `POST https://api.dify.ai/v1/chat-messages`
**认证方式**: Header `Authorization: Bearer {API_KEY}`
**Content-Type**: `application/json`

### 请求体结构 (Request Body)

这是调试过程中最关键的部分。请严格遵守以下 JSON 结构，特别是 `inputimage` 字段的格式。

```json
{
  "query": "这里是提示词内容", 
  "response_mode": "blocking",
  "user": "user-timestamp",
  "inputs": {
    "prompt": "这里是提示词内容",
    "size": "1K",
    "aspect_ratio": "自动",
    
    // ⚠️ 关键点：inputimage 必须是包含单个文件对象的数组
    "inputimage": [
      {
        "type": "image",
        "transfer_method": "local_file",
        "upload_file_id": "步骤一获取的_FILE_ID"
      }
    ],

    // 可选参数：用户自定义输入
    "userinput": {
      "query": "可选的查询参数",
      "files": ["可选的文件ID列表"]
    }
  }
}
```

### ⚠️ 常见错误与解决方案

1. **错误**: `"inputimage in input form must be a list of files"`
   * **原因**: 传递了单个对象 `{...}` 而不是数组 `[{...}]`。
   * **修正**: 将对象包裹在数组中。

2. **错误**: `"Run failed: This parameter only accepts one file but got multiple files"`
   * **原因**: 数组中包含了多个文件，或者传递了错误的对象结构。
   * **修正**: 数组 `[]` 中只能有一个文件对象。

3. **错误**: `"Missing required parameter in the JSON body"` (针对 query)
   * **原因**: 顶层的 `query` 字段缺失。
   * **修正**: 即使在 `inputs` 中有 `prompt`，顶层 JSON 也必须包含 `query` 字段（通常填入相同的提示词）。

---

## 4. 响应处理与图片提取

API 响应结构可能有所不同，建议按以下优先级查找生成的图片 URL：

1. `response.data.outputs.image_url`
2. `response.data.outputs.imageUrl`
3. `response.data.outputs.image`
4. `response.answer` (如果内容以 http 开头)
5. `response.metadata.outputs.image_url`

### 调试建议

如果无法找到图片，请在控制台打印完整的 `response` 对象，查看实际返回的 JSON 结构。
