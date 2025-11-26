import { useState } from "react";
import "./ImageGenerator.css";

/**
 * AI 圖片生成元件
 */
export default function ImageGenerator({ onImageGenerated }) {
	const [prompt, setPrompt] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState(null);

	const handleGenerate = async () => {
		if (!prompt.trim()) {
			setError("請輸入圖片描述");
			return;
		}

		setIsGenerating(true);
		setError(null);

		try {
			const { generateImage } = await import("../services/aiService");
			const imageUrl = await generateImage(prompt);
			onImageGenerated(imageUrl);
		} catch (err) {
			setError(err.message || "生成圖片失敗，請稍後再試");
			console.error(err);
		} finally {
			setIsGenerating(false);
		}
	};

	const presetPrompts = [
		"賽博龐克風格的未來城市夜景",
		"夢幻般的水彩風景畫，櫻花盛開",
		"科幻太空站，充滿霓虹燈光",
		"日式庭園，寧靜的池塘和紅葉",
	];

	return (
		<div className='image-generator'>
			<h2>🎨 AI 圖片生成</h2>

			<div className='info-box'>
				<p>✨ 使用 Pollinations.ai 免費服務</p>
				<small>完全免費，無需 API Key，支援中英文描述</small>
			</div>

			<div className='input-group'>
				<label htmlFor='prompt'>圖片描述</label>
				<textarea
					id='prompt'
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder='描述你想要的圖片...'
					rows={4}
					disabled={isGenerating}
				/>
			</div>

			<div className='preset-prompts'>
				<p>快速範例：</p>
				<div className='preset-buttons'>
					{presetPrompts.map((preset, index) => (
						<button key={index} onClick={() => setPrompt(preset)} className='preset-btn' disabled={isGenerating}>
							{preset}
						</button>
					))}
				</div>
			</div>

			<button onClick={handleGenerate} disabled={isGenerating} className='generate-btn'>
				{isGenerating ? "生成中..." : "🎨 生成圖片"}
			</button>

			{error && <div className='error-message'>⚠️ {error}</div>}

			{isGenerating && (
				<div className='loading-info'>
					<div className='spinner'></div>
					<p>AI 正在創作你的圖片，請稍候...</p>
					<small>通常需要 5-15 秒</small>
				</div>
			)}
		</div>
	);
}
