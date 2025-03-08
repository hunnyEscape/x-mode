import { TEXT_STYLES } from '../constants/const';
export type LegalModalType = 'disclaimer' | 'privacy';

interface FooterProps {
	onOpenLegalModal: (type:LegalModalType) => void;
}

export default function Footer({ onOpenLegalModal }: FooterProps) {
	return (
		<footer className="bg-black/80 backdrop-blur-md text-white h-screen flex items-end">
			<div className="container mx-auto px-4 pb-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="flex flex-col justify-between h-full">
						<div>
							<h2 className={`${TEXT_STYLES.sectionTitle} mb-2`}>X-MODE</h2>
							<p className={TEXT_STYLES.paragraph}>
								eスポーツの新しいスタンダード
							</p>
						</div>
						<div className="flex gap-4 ml-1">
							<button
								onClick={() => onOpenLegalModal('disclaimer')}
								className={`${TEXT_STYLES.articleTitle} cursor-pointer hover:text-white`}
							>
								免責事項
							</button>
							<button
								onClick={() => onOpenLegalModal('privacy')}
								className={`${TEXT_STYLES.articleTitle} cursor-pointer hover:text-white`}
							>
								プライバシーポリシー
							</button>
						</div>
					</div>
					<div>
						<h3 className={`${TEXT_STYLES.articleTitle} mb-4`}>特定商取引に基づく表記</h3>
						<div className={TEXT_STYLES.paragraph}>
							<p className="mb-2">事業者名 : 山根康平</p>
							<p className="mb-2">代表者 : 山根康平</p>
							<p className="mb-2">所在地 : 東京都渋谷区渋谷2-19-15宮益坂ビルディング609</p>
							<p className="mb-2">連絡先 : 050-3115-2346</p>
							<p className="mb-2">メールアドレス : support@acceleratefreedom.jp</p>
							<p className="mb-2">商品代金以外の必要料金 : 設置・サポート費用</p>
							<p className="mb-2">返品・交換 : 商品の特性上、原則として返品・交換は承れません</p>
							<p className="mb-2">お支払い方法 : クレジットカード、銀行振込</p>
							<p>役務の提供時期 : 契約成立後、最短1週間以内</p>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-700 mt-8 pt-6 text-center">
					<p className={TEXT_STYLES.minorText}>
						© {new Date().getFullYear()} MARUGOTO WORKS.AI All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}