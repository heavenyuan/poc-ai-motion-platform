# AI 動態特效平台 - 使用說明

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

應用程式將在 `http://localhost:5173` 啟動。

### 3. 建置生產版本

```bash
npm run build
```

建置後的檔案會在 `dist` 資料夾。

---

## 📖 使用方式

### 步驟 1：生成 AI 圖片

1. 在左側「AI 圖片生成」區塊輸入圖片描述
2. 可以點選快速範例快速填入
3. （選填）輸入 Hugging Face API Key 以提升速度
4. 點選「生成圖片」按鈕

**注意**：

- 首次使用可能需要 20-60 秒載入 AI 模型
- 不提供 API Key 將使用免費推理 API（速度較慢但免費）
- 建議圖片描述使用英文以獲得更好效果

### 步驟 2：預覽動態特效

生成圖片後，右側會自動套用圓形遮罩動態特效並開始播放。

### 步驟 3：匯出 GIF

點選「匯出 GIF」按鈕，等待約 10-20 秒即可下載 GIF 檔案。

---

## 🔑 API Key 設定（選填）

### 取得 Hugging Face API Key

1. 前往 [Hugging Face](https://huggingface.co)
2. 註冊/登入帳號
3. 前往 [Token 設定頁面](https://huggingface.co/settings/tokens)
4. 建立新的 Access Token（Read 權限即可）
5. 複製 Token（格式：`hf_xxx...`）

### 使用 API Key

**方式 1：直接在介面輸入**

- 在「API Key」欄位貼上你的 Token
- 每次使用都需要重新輸入

**方式 2：設定環境變數（推薦）**

1. 複製 `.env.example` 為 `.env`：

   ```bash
   copy .env.example .env
   ```

2. 編輯 `.env` 檔案，取消註解並填入你的 API Key：

   ```
   VITE_HF_API_KEY=hf_your_actual_token_here
   ```

3. 重新啟動開發伺服器

---

## 🎨 特效參數調整

目前程式碼中可調整的動畫參數（位於 `AnimationPreview.jsx`）：

```javascript
{
  circleCount: 8,        // 圓形數量（建議 6-12）
  width: 960,            // 畫布寬度
  height: 610,           // 畫布高度
  minRadius: 50,         // 最小圓形半徑
  maxRadius: 150,        // 最大圓形半徑
  speed: 2               // 移動速度
}
```

---

## 🛠️ 技術棧

- **前端框架**：React 18 + Vite
- **Canvas 操作**：原生 Canvas API
- **GIF 生成**：gif.js
- **AI 圖片生成**：Hugging Face Inference API（Stable Diffusion XL）

---

## ❓ 常見問題

### Q: 為什麼生成圖片這麼慢？

A: Hugging Face 免費推理 API 需要冷啟動模型，首次使用會比較慢。如果經常使用，建議：

- 申請並使用 API Key
- 或考慮付費方案（Replicate、OpenAI DALL-E 等）

### Q: 可以匯出 MP4 影片嗎？

A: 目前 MVP 版本只支援 GIF。要支援 MP4 需要整合 FFmpeg.wasm，未來版本會加入。

### Q: 可以上傳自己的圖片嗎？

A: 目前版本只支援 AI 生成。要支援上傳圖片需要增加檔案上傳功能，可以自行擴展。

### Q: GIF 檔案太大怎麼辦？

A: 可以調整以下參數（在 `CircleMaskAnimation.js` 的 `exportAsGIF` 方法中）：

- `quality`: 10（降低品質以減少檔案大小，範圍 1-20）
- `duration`: 3（縮短時長）
- 或使用線上工具壓縮 GIF

---

## 📝 授權

MIT License

---

## 🙋 需要協助？

如有問題或建議，歡迎提出 Issue 或 Pull Request！
