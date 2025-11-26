/**
 * Pollinations.ai 圖片生成服務
 * 完全免費，無需 API Key
 */

const POLLINATIONS_API_URL = "https://image.pollinations.ai/prompt";

/**
 * 生成 AI 圖片
 * @param {string} prompt - 圖片描述文字
 * @returns {Promise<string>} 圖片 URL
 */
export async function generateImage(prompt) {
	try {
		// Pollinations.ai 支援中英文描述
		// 將描述編碼並加上參數
		const encodedPrompt = encodeURIComponent(prompt);

		// 設定圖片參數
		const params = new URLSearchParams({
			width: "960",
			height: "610",
			seed: Math.floor(Math.random() * 1000000), // 隨機種子確保每次不同
			nologo: "true", // 不顯示浮水印
			enhance: "true", // 增強圖片品質
		});

		// 建立完整 URL
		const imageUrl = `${POLLINATIONS_API_URL}/${encodedPrompt}?${params.toString()}`;

		// Pollinations.ai 直接返回圖片，我們需要確認可以載入
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "anonymous";

			img.onload = () => {
				resolve(imageUrl);
			};

			img.onerror = () => {
				reject(new Error("圖片生成失敗，請重試"));
			};

			// 設定 src 開始載入
			img.src = imageUrl;

			// 30 秒逾時
			setTimeout(() => {
				reject(new Error("圖片生成逾時，請重試"));
			}, 30000);
		});
	} catch (error) {
		console.error("生成圖片失敗:", error);
		throw error;
	}
}

/**
 * 檢查 API 是否可用
 */
export async function checkAPIStatus() {
	try {
		const response = await fetch(POLLINATIONS_API_URL + "/test");
		return true; // Pollinations 通常都可用
	} catch {
		return false;
	}
}
