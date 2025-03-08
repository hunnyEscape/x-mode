"use client";
import React, { useEffect } from "react";
import { TEXT_STYLES } from "../constants/const";

interface InquiryModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {

		useEffect(() => {
			if (!isOpen) return;

			document.body.style.overflow = "hidden"; // スクロール
			return () => {
				document.body.style.overflow = "auto"; // スクロール復帰
			};
		}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md text-white p-6 z-50">
			<div className="w-1/2 overflow-y-auto max-h-[100vh] text-left mx-auto">
				<button
					onClick={onClose}
					className="absolute top-6 right-6 bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-600 transition cursor-pointer"
				>
					✖
				</button>

				<h2 className={`${TEXT_STYLES.sectionTitle}`}>
					お問い合わせ・サービスの流れ
				</h2>

				<div className="space-y-8 mt-6">
					{/* 各ステップ */}
					<section>
						<h3 className={TEXT_STYLES.articleTitle}>📞 1. お問い合わせ & スケジュール調整</h3>
						<p className={TEXT_STYLES.paragraph}>
							まずは<strong>お電話またはお問い合わせフォーム</strong>からご連絡ください。<br />
							お客様のご都合に合わせ、<strong>初回訪問のスケジュールを調整</strong>します。
						</p>
					</section>

					<section>
						<h3 className={TEXT_STYLES.articleTitle}>🏠 2. 初回訪問 & 環境チェック</h3>
						<p className={TEXT_STYLES.paragraph}>
							ご自宅の環境を確認し、必要なセットアップや事前準備を行います。
						</p>
						<ul className="list-disc pl-6">
							<li>✅ ネット環境・設置スペース・電源状況の確認</li>
							<li>✅ 追加の机やモニター、デバイスの最適配置を提案</li>
							<li>✅ 希望するゲーム・配信機能・オプションのヒアリング</li>
							<li>✅ ネット回線業者との調整（必要な回線速度・配線の確認）</li>
						</ul>
					</section>

					<section>
						<h3 className={TEXT_STYLES.articleTitle}>🔧 3. 二度目の訪問 & 設置作業</h3>
						<p className={TEXT_STYLES.paragraph}>
							専門スタッフが訪問し、<strong>ゲーミング & 配信環境のセットアップ</strong>を実施。
						</p>
						<ul className="list-disc pl-6">
							<li>✅ ゲーミングPC・配信機材（カメラ・マイク・入力デバイス）の設置・最適化</li>
							<li>✅ Wi-Fi & 有線LANの最適化で安定したネットワーク環境を構築</li>
							<li>✅ ゲーム・配信ソフトのインストールと動作確認</li>
							<li>✅ 実際の配信テストで、スムーズな配信環境をチェック</li>
						</ul>
					</section>

					<section>
						<h3 className={TEXT_STYLES.articleTitle}>💡 4. 継続サポート & アフターケア</h3>
						<p className={TEXT_STYLES.paragraph}>
							設置後も安心してご利用いただけるよう、<strong>定期的なサポートを提供。</strong>
						</p>
						<ul className="list-disc pl-6">
							<li>🔹 機材や配信設定の調整・トラブル対応</li>
							<li>🔹 新しいゲームや機能の追加・設定変更のサポート</li>
							<li>🔹 機材アップグレードの相談 & 手配</li>
						</ul>
					</section>

					<section>
						<h3 className={TEXT_STYLES.articleTitle}>📩 今すぐお問い合わせください！</h3>
						<p className={TEXT_STYLES.paragraph}>
							ゲーム & 配信環境の構築は、<strong>専門のプロにお任せください。</strong><br />
							快適なゲーミングライフをスタートするために、<strong>まずはお気軽にご相談を！</strong>
						</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default InquiryModal;
