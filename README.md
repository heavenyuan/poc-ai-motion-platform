# AI 動態特效平台 MVP

## 專案簡介

將 AI 生成的圖片套用動態特效並匯出為 GIF 的 Web 應用程式。

## 功能特色

- ✨ AI 圖片生成（Hugging Face API）
- 🎨 圓形遮罩動態特效
- 📥 GIF 匯出功能
- 🚀 純前端實作，無需後端

## 技術棧

- **前端框架**：React 18 + Vite
- **Canvas 操作**：Fabric.js
- **GIF 生成**：gif.js
- **AI API**：Hugging Face Inference API

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

## 使用方式

1. 輸入圖片描述文字
2. 點選「生成圖片」按鈕
3. 等待 AI 生成圖片
4. 預覽動態特效
5. 匯出為 GIF

## 開發說明

- `src/components/` - React 元件
- `src/lib/` - Canvas 動畫邏輯
- `src/services/` - API 呼叫服務

## License

MIT
