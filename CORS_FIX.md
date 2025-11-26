# CORS 問題修復說明

## 問題描述

瀏覽器的同源政策（CORS）阻止直接從 `localhost:5173` 呼叫 Hugging Face API。

## 解決方案

使用 **Vite 開發伺服器代理**功能，將 API 請求轉發到 Hugging Face。

### 修改內容

**1. vite.config.js**

```javascript
server: {
  proxy: {
    '/api/hf': {
      target: 'https://api-inference.huggingface.co',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/hf/, '')
    }
  }
}
```

**2. aiService.js**

```javascript
// 原本
const HF_API_URL = "https://api-inference.huggingface.co/...";

// 改為
const HF_API_URL = "/api/hf/models/...";
```

## 使用方式

1. 已重新啟動開發伺服器
2. 重新整理瀏覽器（F5 或 Ctrl+R）
3. 現在可以正常呼叫 API 了

## 注意事項

⚠️ **這個解決方案只在開發環境有效**

部署到生產環境時有兩個選擇：

### 選項 A：使用 API Key

Hugging Face 在提供有效 API Key 時會允許 CORS 請求。

### 選項 B：建立後端代理

建立一個簡單的後端服務轉發請求，例如使用 Vercel Serverless Functions。

## 測試步驟

1. 開啟 http://localhost:5173
2. 輸入圖片描述
3. 點選「生成圖片」
4. 首次可能需要 20-60 秒載入模型
5. 如果仍有問題，請提供 API Key
