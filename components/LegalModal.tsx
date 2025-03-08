"use client";
import React, { useEffect } from 'react';
import { TEXT_STYLES } from '../constants/const';
import { LegalModalType } from './Footer';
interface LegalModalProps {
	isOpen: boolean;
	type: LegalModalType | null;
	onClose: () => void;
}
export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';

			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') onClose();
			};

			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.removeEventListener('keydown', handleKeyDown);
				document.body.style.overflow = 'auto';
			};
		}
	}, [isOpen, onClose]);

	if (!isOpen || !type) return null;

	const renderModalContent = () => {
		switch (type) {
			case 'disclaimer':
				return (
					<div>
						<h2 className={`${TEXT_STYLES.sectionTitle} mb-4`}>免責事項</h2>
						<div className={TEXT_STYLES.paragraph}>
							<p className="mb-2">1. 情報の正確性について</p>
							<p className="mb-4">当社は、本ウェブサイトに掲載されている情報の正確性には最大限の注意を払っておりますが、その完全性や正確性を保証するものではありません。</p>

							<p className="mb-2">2. サービス利用に関する免責</p>
							<p className="mb-4">当社のサービスを利用することによって生じる、いかなる損害についても当社は責任を負いません。</p>

							<p className="mb-2">3. リンク先のウェブサイト</p>
							<p className="mb-4">当社のウェブサイトから他のウェブサイトへのリンクを提供している場合、そのリンク先のウェブサイトの内容や信頼性について当社は一切の責任を負いません。</p>

							<p className="mb-2">4. 予告なしの変更</p>
							<p>当社は、本ウェブサイトの内容を予告なく変更する場合があります。</p>
						</div>
					</div>
				);

			case 'privacy':
				return (
					<div>
						<h2 className={`${TEXT_STYLES.sectionTitle} mb-4`}>プライバシーポリシー</h2>
						<div className={TEXT_STYLES.paragraph}>
							<p className="mb-2">1. 個人情報の収集</p>
							<p className="mb-4">当社は、サービス提供に必要な最小限の個人情報のみを収集いたします。</p>

							<p className="mb-2">2. 個人情報の利用目的</p>
							<p className="mb-4">収集した個人情報は、サービス提供、お客様サポート、及び重要なお知らせの連絡のみに使用いたします。</p>

							<p className="mb-2">3. 第三者への提供</p>
							<p className="mb-4">法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。</p>

							<p className="mb-2">4. 情報の管理</p>
							<p className="mb-4">個人情報は、不正アクセス、紛失、破壊、改ざん等から保護するため、適切な安全管理措置を講じます。</p>

							<p className="mb-2">5. 開示・訂正・削除</p>
							<p>お客様は、当社が保有する自己の個人情報の開示、訂正、削除を求めることができます。</p>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
			<div className="w-3/4 max-h-[80vh] overflow-y-auto p-8 relative">
				<button
					onClick={onClose}
					className="absolute top-6 right-6 bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-600 transition cursor-pointer"
				>
					✖
				</button>
				{renderModalContent()}
			</div>
		</div>
	);
}