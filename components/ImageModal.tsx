"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GameInfo } from "../components/GameCard";
import { TEXT_STYLES } from "../constants/const";

interface ImageModalProps {
	game: GameInfo | null;
	modalOpen: boolean;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ game, modalOpen, onClose }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(true);

	useEffect(() => {
		if (!modalOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
			if (e.key === "ArrowRight") nextImage();
			if (e.key === "ArrowLeft") prevImage();
		};

		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden"; // スクロール禁止
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "auto"; // スクロール復帰
		};
	}, [modalOpen]);

	if (!game || !modalOpen) return null;

	// 画像の切り替え
	const nextImage = () => setCurrentIndex((prev) => (prev + 1) % game.images.length);
	const prevImage = () =>
		setCurrentIndex((prev) => (prev - 1 + game.images.length) % game.images.length);

	// モーダルを閉じる処理（画像インデックスをリセット）
	const handleClose = () => {
		setCurrentIndex(0);
		onClose();
	};

	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md z-50 p-6">
			{/* ✖ Close ボタン（画像の外・右上に配置） */}
			<button
				onClick={handleClose}
				className="absolute top-6 right-6 bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-600 transition cursor-pointer"
			>
				✖
			</button>

			{/* モーダル本体 */}
			<div className="w-3/4 rounded-lg">
				{/* 画像スライダー */}
				<div
					className="flex flex-col items-center relative"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<Image
						src={game.images[currentIndex]}
						alt={game.title}
						width={1600}
						height={900}
						className="w-full h-auto rounded-lg"
					/>
					<div
						className={`absolute inset-0 flex items-center justify-center bg-black/70 text-white p-6 ${isHovered ? "opacity-100" : "opacity-0 transition-opacity duration-300"
							}`}
					>
						<p
							className={`${TEXT_STYLES.articleTitle} text-center leading-loose`}
							dangerouslySetInnerHTML={{ __html: game.description }}
						/>
					</div>


				</div>
				<div className="mt-6 flex justify-between items-center">
					<h3 className={`${TEXT_STYLES.sectionTitle} text-left`}>{game.title}</h3>
					<div className="flex gap-4">
						<button
							onClick={prevImage}
							className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
						>
							◀ 前の画像
						</button>
						<button
							onClick={nextImage}
							className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
						>
							次の画像 ▶
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageModal;
