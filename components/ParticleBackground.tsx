"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAPプラグインを登録
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

// アニメーション設定パラメータ
const ANIMATION_CONFIG = {
	// パーティクル関連
	PARTICLE_DENSITY: 4,         // パーティクルの密度 (大きいほど疎になる)
	PARTICLE_SIZE: 3,            // パーティクルのサイズ
	PARTICLE_SPREAD_X: 200,      // X方向の拡散範囲
	PARTICLE_SPREAD_Y: 200,      // Y方向の拡散範囲
	USE_ROUND_PARTICLES: false,  // 丸いパーティクルを使用するか

	// スクロールトリガー関連
	SCRUB_FACTOR: 0.5,           // スクロールの滑らかさ (大きいほど滑らか)

	// 散らばり開始・終了位置
	START_SCATTER_VH: 2,      // 散らばり始めるスクロール位置 (vh単位)
	MID_POINT_VH: 4.5,            // 最大散らばり位置 (vh単位)
	END_SCATTER_VH: 7,          // 元に戻り終わる位置 (vh単位)

	// 進行度計算関連
	SCATTER_POWER: 0.5,          // 散らばる速度のべき乗 (大きいほど加速が緩やか)
	GATHER_POWER: 2.5,           // 戻る速度のべき乗 (大きいほど加速が緩やか)

	// デバッグ
	//SHOW_DEBUG: process.env.NODE_ENV === 'development',  // デバッグ情報を表示するか
	SHOW_DEBUG: false,
};

const ParticleBackground: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
	const particlesRef = useRef<Array<Particle>>([]);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
	const [debugLog, setDebugLog] = useState<string[]>([]);

	// デバッグログを追加
	const addDebugLog = (message: string) => {
		setDebugLog(prev => [...prev, message]);
		console.log(message);
	};

	// パーティクルクラス
	class Particle {
		x: number;
		y: number;
		originX: number;
		originY: number;
		color: string;
		size: number;
		randomX: number;
		randomY: number;

		constructor(x: number, y: number, color: string, size: number) {
			this.x = x;
			this.y = y;
			this.originX = x;
			this.originY = y;
			this.color = color;
			this.size = size;
			// 設定値を使用
			this.randomX = Math.random() * ANIMATION_CONFIG.PARTICLE_SPREAD_X * 2 - ANIMATION_CONFIG.PARTICLE_SPREAD_X;
			this.randomY = Math.random() * ANIMATION_CONFIG.PARTICLE_SPREAD_Y * 2 - ANIMATION_CONFIG.PARTICLE_SPREAD_Y;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.fillStyle = this.color;

			if (ANIMATION_CONFIG.USE_ROUND_PARTICLES) {
				// 丸いパーティクル
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
				ctx.fill();
			} else {
				// 四角いパーティクル
				ctx.fillRect(this.x, this.y, this.size, this.size);
			}
		}

		update(progress: number) {
			// progress: 0 = 原点, 1 = 完全に散らばった状態
			this.x = this.originX + (this.randomX * progress);
			this.y = this.originY + (this.randomY * progress);
		}
	}

	// 画像のロード処理
	useEffect(() => {
		if (typeof window === 'undefined') return;

		// globalのHTMLImageElementを使用
		const img = new window.Image();
		img.crossOrigin = "anonymous";
		img.src = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/bg.webp`;

		img.onload = () => {
			addDebugLog(`画像がロードされました: ${img.width}x${img.height}`);
			setImageElement(img);
			setImageLoaded(true);
		};

		img.onerror = (e) => {
			addDebugLog(`画像の読み込みに失敗しました: ${e}`);
		};
	}, []);

	// 画像をパーティクルに変換する関数
	const createParticlesFromImage = () => {
		if (!canvasRef.current || !imageElement || !imageLoaded) {
			addDebugLog('パーティクル生成の前提条件が満たされていません');
			return;
		}

		addDebugLog('パーティクル生成を開始します');
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			addDebugLog('キャンバスコンテキストを取得できませんでした');
			return;
		}

		// 一時的なキャンバスを作成して画像データを取得
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d');
		if (!tempCtx) {
			addDebugLog('一時キャンバスコンテキストを取得できませんでした');
			return;
		}

		// 画像のスケールを調整して画面内に収めるための計算
		const windowAspect = window.innerWidth / window.innerHeight;
		const imageAspect = imageElement.width / imageElement.height;

		let drawWidth, drawHeight;
		let offsetX = 0, offsetY = 0;

		if (windowAspect > imageAspect) {
			// ウィンドウの方が横長の場合、幅に合わせる
			drawWidth = window.innerWidth;
			drawHeight = drawWidth / imageAspect;
			offsetY = (window.innerHeight - drawHeight) / 2;
		} else {
			// ウィンドウの方が縦長の場合、高さに合わせる
			drawHeight = window.innerHeight;
			drawWidth = drawHeight * imageAspect;
			offsetX = (window.innerWidth - drawWidth) / 2;
		}

		// 一時キャンバスのサイズを設定
		const scale = 0.5; // パフォーマンスのためにスケールダウン
		tempCanvas.width = drawWidth * scale;
		tempCanvas.height = drawHeight * scale;

		// 画像を一時キャンバスに描画
		tempCtx.drawImage(imageElement, 0, 0, tempCanvas.width, tempCanvas.height);

		try {
			// 画像データをピクセル単位で取得
			const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
			const data = imageData.data;

			// 設定からパーティクルの密度を使用
			const density = ANIMATION_CONFIG.PARTICLE_DENSITY;

			// パーティクルを作成
			particlesRef.current = [];
			for (let y = 0; y < tempCanvas.height; y += density) {
				for (let x = 0; x < tempCanvas.width; x += density) {
					const index = (y * tempCanvas.width + x) * 4;
					// アルファ値が一定以上の場合のみパーティクルを作成
					if (data[index + 3] > 128) {
						const r = data[index];
						const g = data[index + 1];
						const b = data[index + 2];
						const color = `rgb(${r},${g},${b})`;

						// キャンバス上の正しい位置に配置
						const screenX = (x / scale) + offsetX;
						const screenY = (y / scale) + offsetY;

						const particle = new Particle(
							screenX,
							screenY,
							color,
							density * (ANIMATION_CONFIG.PARTICLE_SIZE / 2)
						);

						particlesRef.current.push(particle);
					}
				}
			}

			addDebugLog(`${particlesRef.current.length}個のパーティクルを生成しました`);
		} catch (error) {
			addDebugLog(`画像データの処理中にエラーが発生しました: ${error}`);
		}
	};

	// アニメーションを描画
	const animate = (progress: number) => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// キャンバスをクリア
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// 進行度が0の場合（画像表示の状態）は、パーティクルではなく元の画像を描画
		if (progress === 0 && imageElement) {
			// 画像のスケールを調整して画面内に収めるための計算
			const windowAspect = window.innerWidth / window.innerHeight;
			const imageAspect = imageElement.width / imageElement.height;

			let drawWidth, drawHeight;
			let offsetX = 0, offsetY = 0;

			if (windowAspect > imageAspect) {
				// ウィンドウの方が横長の場合、幅に合わせる
				drawWidth = window.innerWidth;
				drawHeight = drawWidth / imageAspect;
				offsetY = (window.innerHeight - drawHeight) / 2;
			} else {
				// ウィンドウの方が縦長の場合、高さに合わせる
				drawHeight = window.innerHeight;
				drawWidth = drawHeight * imageAspect;
				offsetX = (window.innerWidth - drawWidth) / 2;
			}

			// 元の画像を描画
			ctx.drawImage(imageElement, offsetX, offsetY, drawWidth, drawHeight);
			return;
		}

		// パーティクルを更新して描画
		particlesRef.current.forEach(particle => {
			particle.update(progress);
			particle.draw(ctx);
		});
	};

	// ウィンドウサイズ変更時の処理
	useEffect(() => {
		const handleResize = () => {
			if (!containerRef.current) return;

			const width = window.innerWidth;
			const height = window.innerHeight;

			setCanvasSize({ width, height });
			addDebugLog(`キャンバスサイズを変更: ${width}x${height}`);

			// サイズ変更後にアニメーションを更新（粒子が0の場合は進行度0で元画像を表示）
			if (particlesRef.current.length === 0) {
				animate(0);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	// キャンバスサイズが変更されたら、パーティクルを再生成
	useEffect(() => {
		if (canvasSize.width > 0 && canvasSize.height > 0 && imageLoaded && imageElement) {
			createParticlesFromImage();
		}
	}, [canvasSize, imageLoaded, imageElement]);

	// スクロールアニメーションを設定
	useEffect(() => {
		if (typeof window === 'undefined' || !particlesRef.current.length) {
			addDebugLog('スクロールアニメーション設定の前提条件が満たされていません');
			return;
		}

		addDebugLog('スクロールアニメーションを設定します');

		// 初期状態（進行度0）を描画
		animate(0);

		// スクロールトリガーを設定
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: 'body',
				start: 'top top',
				end: 'bottom bottom',
				scrub: ANIMATION_CONFIG.SCRUB_FACTOR, // 設定値を使用
				onUpdate: (self) => {
					let progress = 0;

					// スクロール位置に基づいて進行度を計算
					const scrollPos = self.progress * document.body.scrollHeight;

					// 設定からVH値を取得
					const start = window.innerHeight * ANIMATION_CONFIG.START_SCATTER_VH;
					const mid = window.innerHeight * ANIMATION_CONFIG.MID_POINT_VH;
					const end = window.innerHeight * ANIMATION_CONFIG.END_SCATTER_VH;

					if (scrollPos < start) {
						// 開始位置より前: 進行度0（画像のまま）
						progress = 0;
					} else if (scrollPos > end) {
						// 終了位置より後: 進行度0（画像に戻る）
						progress = 0;
					} else if (scrollPos < mid) {
						// 開始から中間まで: 散らばる
						// 設定からべき乗値を使用
						progress = Math.pow((scrollPos - start) / (mid - start), ANIMATION_CONFIG.SCATTER_POWER);
					} else {
						// 中間から終了まで: 元に戻る
						// 設定からべき乗値を使用
						progress = 1 - Math.pow((scrollPos - mid) / (end - mid), ANIMATION_CONFIG.GATHER_POWER);
					}

					// パーティクルアニメーションを更新
					animate(progress);
				}
			}
		});

		return () => {
			// クリーンアップ
			if (tl.scrollTrigger) {
				tl.scrollTrigger.kill();
			}
		};
	}, [particlesRef.current.length]);

	return (
		<div ref={containerRef} className="fixed top-0 left-0 w-full h-full bg-black pointer-events-none z-0">
			<canvas
				ref={canvasRef}
				width={canvasSize.width}
				height={canvasSize.height}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: 'transparent',
				}}
			/>
			{ANIMATION_CONFIG.SHOW_DEBUG && (
				<div style={{
					position: 'fixed',
					bottom: 10,
					left: 10,
					backgroundColor: 'rgba(0,0,0,0.7)',
					color: 'white',
					padding: '10px',
					fontSize: '12px',
					zIndex: 9999,
					maxHeight: '200px',
					overflowY: 'auto',
					maxWidth: '80%',
					pointerEvents: 'auto'
				}}>
					<h4>デバッグログ:</h4>
					<ul>
						{debugLog.map((log, i) => (
							<li key={i}>{log}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ParticleBackground;