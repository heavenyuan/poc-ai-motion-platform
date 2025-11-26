# GitHub Pages 部署指南

## 📝 部署步驟

### 1. 初始化 Git Repository（如果還沒有的話）

```bash
cd C:\work\heavenyuan\poc-ai-motion-platform
git init
git add .
git commit -m "Initial commit: AI Motion Platform MVP"
```

### 2. 建立 GitHub Repository

1. 前往 https://github.com/new
2. Repository name: `poc-ai-motion-platform`
3. 選擇 **Public**（Private 也可以，但需要 GitHub Pro）
4. 不要勾選 "Initialize this repository with README"
5. 點選 "Create repository"

### 3. 連結到 GitHub Repository

```bash
git remote add origin https://github.com/heavenyuan/poc-ai-motion-platform.git
git branch -M main
git push -u origin main
```

### 4. 啟用 GitHub Pages

1. 前往你的 GitHub Repository 頁面
2. 點選 **Settings** (設定)
3. 左側選單點選 **Pages**
4. 在 "Build and deployment" 區塊：
   - **Source**: 選擇 "GitHub Actions"
5. 儲存設定

### 5. 觸發部署

推送程式碼後，GitHub Actions 會自動開始建置和部署：

```bash
git add .
git commit -m "Set up GitHub Pages deployment"
git push
```

### 6. 查看部署狀態

1. 前往 Repository 的 **Actions** 頁籤
2. 查看 "Deploy to GitHub Pages" workflow 執行狀態
3. 等待綠色勾勾（✓）表示部署成功

### 7. 存取你的網站

部署成功後，你的網站會在：

```
https://heavenyuan.github.io/poc-ai-motion-platform/
```

---

## 🔄 後續更新

之後每次推送到 `main` 分支，GitHub Actions 會自動重新部署：

```bash
# 修改程式碼後
git add .
git commit -m "Update: description of changes"
git push
```

大約 1-2 分鐘後，網站就會更新。

---

## ⚠️ 常見問題

### Q: 部署後網頁空白或 404？

**A:** 確認 `vite.config.js` 的 `base` 設定正確：

```javascript
base: "/poc-ai-motion-platform/"; // 必須與 repository 名稱一致
```

### Q: 可以使用自訂網域嗎？

**A:** 可以！在 GitHub Pages 設定中新增自訂網域（例如：`demo.example.com`），並在 DNS 設定 CNAME 記錄。

### Q: 如何查看建置日誌？

**A:** 前往 Repository → Actions → 點選最新的 workflow run → 查看詳細日誌

---

## 📦 專案檔案說明

已新增的檔案：

1. **`.github/workflows/deploy.yml`**

   - GitHub Actions 自動部署設定檔
   - 每次推送到 main 分支時自動執行

2. **`vite.config.js`** (已更新)
   - 新增 `base: '/poc-ai-motion-platform/'`
   - 確保靜態資源路徑正確

---

## 🎉 完成！

按照以上步驟操作後，你的 AI 動態特效平台就會在 GitHub Pages 上線了！
