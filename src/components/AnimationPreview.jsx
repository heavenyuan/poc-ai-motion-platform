import { useEffect, useRef, useState } from "react";
import { CircleMaskAnimation } from "../lib/CircleMaskAnimation";
import "./AnimationPreview.css";

/**
 * 動畫預覽元件
 */
export default function AnimationPreview({ imageUrl, onExport }) {
	const canvasRef = useRef(null);
	const animationRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isExporting, setIsExporting] = useState(false);
	const [exportProgress, setExportProgress] = useState(0);

	useEffect(() => {
		if (!imageUrl || !canvasRef.current) return;

		// 初始化動畫
		const initAnimation = async () => {
			try {
				// 清理舊動畫
				if (animationRef.current) {
					animationRef.current.dispose();
				}

				const animation = new CircleMaskAnimation(canvasRef.current, imageUrl, {
					circleCount: 8,
					width: 960,
					height: 610,
					minRadius: 50,
					maxRadius: 150,
					speed: 2,
				});

				await animation.init();
				animationRef.current = animation;

				// 自動開始播放
				animation.start();
				setIsPlaying(true);
			} catch (error) {
				console.error("動畫初始化失敗:", error);
			}
		};

		initAnimation();

		return () => {
			if (animationRef.current) {
				animationRef.current.dispose();
				animationRef.current = null;
			}
		};
	}, [imageUrl]);

	const togglePlay = () => {
		if (!animationRef.current) return;

		if (isPlaying) {
			animationRef.current.stop();
			setIsPlaying(false);
		} else {
			animationRef.current.start();
			setIsPlaying(true);
		}
	};

	const handleExport = async () => {
		if (!animationRef.current) return;

		setIsExporting(true);
		setExportProgress(0);

		try {
			const blob = await animationRef.current.exportAsGIF(3, (progress) => {
				setExportProgress(Math.round(progress * 100));
			});

			// 下載 GIF
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `ai-motion-${Date.now()}.gif`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			if (onExport) onExport(blob);
		} catch (error) {
			console.error("匯出失敗:", error);
			alert("匯出失敗，請重試");
		} finally {
			setIsExporting(false);
			setExportProgress(0);
		}
	};

	if (!imageUrl) {
		return (
			<div className='animation-preview empty'>
				<div className='empty-state'>
					<p>👆 請先生成圖片</p>
				</div>
			</div>
		);
	}

	return (
		<div className='animation-preview'>
			<h2>✨ 動態特效預覽</h2>

			<div className='canvas-container'>
				<canvas ref={canvasRef} />
			</div>

			<div className='controls'>
				<button onClick={togglePlay} className='control-btn'>
					{isPlaying ? "⏸️ 暫停" : "▶️ 播放"}
				</button>

				<button onClick={handleExport} disabled={isExporting} className='export-btn'>
					{isExporting ? `匯出中 ${exportProgress}%` : "📥 匯出 GIF"}
				</button>
			</div>

			{isExporting && (
				<div className='export-progress'>
					<div className='progress-bar'>
						<div className='progress-fill' style={{ width: `${exportProgress}%` }} />
					</div>
					<p>正在生成 GIF，請稍候...</p>
				</div>
			)}
		</div>
	);
}
