import { useState } from "react";
import ImageGenerator from "./components/ImageGenerator";
import AnimationPreview from "./components/AnimationPreview";
import "./App.css";

function App() {
	const [generatedImage, setGeneratedImage] = useState(null);

	return (
		<div className='app'>
			<header className='app-header'>
				<h1>🎨 AI 動態特效生成器</h1>
				<p>使用 AI 創作圖片，並套用動態特效匯出為 GIF</p>
			</header>

			<main className='app-main'>
				<div className='grid-container'>
					<div className='grid-item'>
						<ImageGenerator onImageGenerated={setGeneratedImage} />
					</div>

					<div className='grid-item'>
						<AnimationPreview imageUrl={generatedImage} />
					</div>
				</div>
			</main>

			<footer className='app-footer'>
				<p>技術棧：React + Vite + Fabric.js + Hugging Face API</p>
				<p className='hint'>💡 提示：首次使用 AI 生成可能需要較長時間載入模型</p>
			</footer>
		</div>
	);
}

export default App;
