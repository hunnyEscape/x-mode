"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";

// 背景シーンコンポーネント
const BackgroundScene = () => {
	const texture = useLoader(THREE.TextureLoader, `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/bg.webp`);
	const meshRef = useRef<THREE.Mesh>(null);

	useEffect(() => {
		if (texture) {
			texture.minFilter = THREE.LinearFilter;
			texture.magFilter = THREE.LinearFilter;
			texture.needsUpdate = true;
		}
	}, [texture]);

	// 画面サイズに完全に合わせる
	useEffect(() => {
		if (!meshRef.current) return;

		const resize = () => {
			const camera = meshRef.current?.parent?.parent?.children.find(
				child => child instanceof THREE.Camera
			) as THREE.PerspectiveCamera;

			if (!camera) return;

			// カメラの視錐台の寸法を計算
			const distance = camera.position.z;
			const fov = THREE.MathUtils.degToRad(camera.fov);
			const height = 2 * Math.tan(fov / 2) * distance;
			const width = height * (window.innerWidth / window.innerHeight);

			// メッシュのサイズをカメラの視野に合わせる
			if (meshRef.current) {
				meshRef.current.scale.set(width, height, 1);
			}
		};

		resize();
		window.addEventListener('resize', resize);
		return () => window.removeEventListener('resize', resize);
	}, []);

	return (
		<mesh ref={meshRef} position={[0, 0, 0]}>
			<planeGeometry args={[1, 1]} />
			<meshBasicMaterial map={texture} transparent={true} />
		</mesh>
	);
};

// メインコンポーネント
const BackgroundAnimation: React.FC = () => {
	const [mounted, setMounted] = useState(false);

	// クライアントサイドでのみレンダリング
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: 10,
			pointerEvents: 'none',
			overflow: 'hidden'
		}}>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 60 }}
				style={{ width: '100%', height: '100%' }}
				gl={{ antialias: true, alpha: true }}
			>
				<ambientLight intensity={1} />
				<BackgroundScene />
			</Canvas>
		</div>
	);
};

export default BackgroundAnimation;