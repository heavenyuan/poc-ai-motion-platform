import GIF from "gif.js";

/**
 * 圓形遮罩動畫類別
 * 基於原始專案改進的現代化版本（使用原生 Canvas API）
 */
export class CircleMaskAnimation {
	constructor(canvasElement, imageUrl, options = {}) {
		this.canvasElement = canvasElement;
		this.imageUrl = imageUrl;
		this.options = {
			circleCount: options.circleCount || 8,
			width: options.width || 960,
			height: options.height || 610,
			minRadius: options.minRadius || 50,
			maxRadius: options.maxRadius || 150,
			speed: options.speed || 2,
			...options,
		};

		this.ctx = null;
		this.circles = [];
		this.backgroundImage = null;
		this.animationFrameId = null;
		this.isAnimating = false;
	}

	/**
	 * 初始化動畫
	 */
	async init() {
		// 設定 Canvas 尺寸
		this.canvasElement.width = this.options.width;
		this.canvasElement.height = this.options.height;
		this.ctx = this.canvasElement.getContext("2d");

		// 載入背景圖片
		await this.loadBackgroundImage();

		// 建立圓形遮罩
		this.createCircleMasks();

		return this;
	}

	/**
	 * 載入背景圖片
	 */
	loadBackgroundImage() {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "anonymous";

			img.onload = () => {
				this.backgroundImage = img;
				resolve(img);
			};

			img.onerror = () => {
				reject(new Error("圖片載入失敗"));
			};

			img.src = this.imageUrl;
		});
	}

	/**
	 * 建立圓形遮罩
	 */
	createCircleMasks() {
		const { width, height, circleCount, minRadius, maxRadius, speed } = this.options;

		this.circles = [];
		for (let i = 0; i < circleCount; i++) {
			const radius = Math.random() * (maxRadius - minRadius) + minRadius;
			const speedFactor = speed * (1 - (radius / maxRadius) * 0.5);

			const circle = {
				x: Math.random() * (width - radius * 2) + radius,
				y: Math.random() * (height - radius * 2) + radius,
				radius: radius,
				vx: (Math.random() > 0.5 ? 1 : -1) * speedFactor,
				vy: (Math.random() > 0.5 ? 1 : -1) * speedFactor,
				opacity: Math.random() * 0.3 + 0.7,
			};

			this.circles.push(circle);
		}
	}

	/**
	 * 開始動畫
	 */
	start() {
		if (this.isAnimating) return;
		this.isAnimating = true;
		this.animate();
	}

	/**
	 * 停止動畫
	 */
	stop() {
		this.isAnimating = false;
		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
	}

	/**
	 * 動畫循環
	 */
	animate() {
		if (!this.isAnimating) return;

		this.updateCirclePositions();
		this.render();

		this.animationFrameId = requestAnimationFrame(() => this.animate());
	}

	/**
	 * 更新圓形位置
	 */
	updateCirclePositions() {
		const { width, height } = this.options;

		this.circles.forEach((circle) => {
			circle.x += circle.vx;
			circle.y += circle.vy;

			// 邊界反彈
			if (circle.x - circle.radius <= 0 || circle.x + circle.radius >= width) {
				circle.vx *= -1;
				circle.x = Math.max(circle.radius, Math.min(width - circle.radius, circle.x));
			}
			if (circle.y - circle.radius <= 0 || circle.y + circle.radius >= height) {
				circle.vy *= -1;
				circle.y = Math.max(circle.radius, Math.min(height - circle.radius, circle.y));
			}
		});
	}

	/**
	 * 繪製畫面
	 */
	render() {
		if (!this.ctx || !this.backgroundImage) return;

		const { width, height } = this.options;

		// 清空畫布
		this.ctx.clearRect(0, 0, width, height);
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, width, height);

		// 繪製每個圓形遮罩
		this.circles.forEach((circle) => {
			this.ctx.save();

			// 建立圓形路徑
			this.ctx.beginPath();
			this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
			this.ctx.closePath();
			this.ctx.clip();

			// 在遮罩內繪製圖片
			this.ctx.globalAlpha = circle.opacity;
			this.ctx.drawImage(this.backgroundImage, 0, 0, width, height);

			this.ctx.restore();
		});
	}

	/**
	 * 匯出為 GIF
	 */
	exportAsGIF(duration = 3, onProgress) {
		return new Promise((resolve, reject) => {
			try {
				const fps = 30;
				const totalFrames = duration * fps;
				const gif = new GIF({
					workers: 2,
					quality: 10,
					width: this.options.width,
					height: this.options.height,
					workerScript: "/gif.worker.js",
				});

				gif.on("progress", (progress) => {
					if (onProgress) onProgress(progress);
				});

				gif.on("finished", (blob) => {
					resolve(blob);
				});

				// 錄製幀
				let frameCount = 0;
				const captureFrame = () => {
					if (frameCount >= totalFrames) {
						gif.render();
						return;
					}

					// 更新動畫
					this.updateCirclePositions();
					this.render();

					// 捕捉當前幀
					const imageData = this.ctx.getImageData(0, 0, this.options.width, this.options.height);
					gif.addFrame(imageData, { delay: 1000 / fps });

					frameCount++;
					requestAnimationFrame(captureFrame);
				};

				captureFrame();
			} catch (error) {
				reject(error);
			}
		});
	}

	/**
	 * 銷毀實例
	 */
	dispose() {
		this.stop();
		this.circles = [];
		this.backgroundImage = null;
		this.ctx = null;
	}
}
