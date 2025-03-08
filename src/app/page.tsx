"use client";
import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image';
import GameCard, { GameInfo } from '../../components/GameCard';
import ImageModal from '../../components/ImageModal';
import InquiryModal from "../../components/InquiryModal";
import { TEXT_STYLES, gameInfos, games } from '../../constants/const';
import ParticleBackground from '../../components/ParticleBackground';
import Footer,{LegalModalType} from '../../components/Footer';
import LegalModal from '../../components/LegalModal';
export default function Home() {
	const [selectedGame, setSelectedGame] = useState<GameInfo | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
	const [legalModalOpen,setLegalModalOpen] = useState(false);
	const [legalModalType,setLegalModalType] = useState<LegalModalType>('disclaimer');
	const handleOpenModal = (game: GameInfo) => {
		setSelectedGame(game);
		setModalOpen(true);
	};
	const isLegalModalOpen = (legalModalType:LegalModalType) =>{
		setLegalModalType(legalModalType);
		setLegalModalOpen(true);
	}
	return (
		<>
			<LegalModal isOpen={legalModalOpen} onClose={()=>setLegalModalOpen(false)} type={legalModalType}/>
			<ImageModal
				game={selectedGame}
				modalOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
			<InquiryModal isOpen={inquiryModalOpen} onClose={() => setInquiryModalOpen(false)} />
			<Head>
				<title>加速する自由 - ゲーミング配信サービス</title>
				<meta
					name="description"
					content="専門のプロによるゲーミング＆配信環境構築サポート。快適なプレイ環境を実現します。"
				/>
			</Head>
			<div className="z-[-1]">
				<ParticleBackground />
			</div>
			<div className="bg-white text-gray-800 font-sans min-h-screen">
				<main className="mx-full">
					<div className="relative flex w-1/2 h-screen items-center justify-center text-center text-white bg-black">
						<div className="text-left w-4/5">
							<h1 className={TEXT_STYLES.sectionTitle}>加速する自由</h1>
							<p className={TEXT_STYLES.subtitle}>垣根を超えてすべてが一つになる</p>
						</div>
					</div>
					<div className="relative flex w-1/2 h-[150vh] items-center justify-center text-center text-white bg-black">
						<div className="text-left w-4/5">
							<h1 className={TEXT_STYLES.sectionTitle}>選び抜かれたセットアップ<br />最高のパフォーマンスを。</h1>
							<Image
								src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/desktop.webp`}
								alt="desktop"
								width={500}
								height={300}
								className="w-full rounded-lg"
							/>
							<p className={`${TEXT_STYLES.subtitle} mt-2`}>マイク、カメラ、入力デバイス、PCを厳選し、配信に最適な環境を構築。乱雑なコードやデバイス配置を整え快適なプレイ環境を提供します。機材の性能だけでなく、スムーズな操作と美しい映像を実現するための細部にまでこだわります。</p>
						</div>
					</div>
					<div className="relative flex w-1/2 h-[100vh] bg-black" />
					<div className="relative flex w-full h-[180vh] items-center justify-center text-white bg-black">
						<div className="text-left w-2/3">
							<h1 className={TEXT_STYLES.sectionTitle}>拡張された世界に浸る体験</h1>
							<p className={TEXT_STYLES.subtitle}>これらのタイトルを最高設定でお楽しみ頂けます。</p>
							<div className="grid grid-cols-2 gap-6 mt-10">
								{games.map((game, index) => (
									<GameCard
										key={index}
										title={game.title}
										description={game.description}
										imageUrl={game.imageUrl}
										onClick={handleOpenModal}
										gameInfo={gameInfos[index]}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="relative flex w-1/2 h-[100vh] items-center justify-left text-white bg-black ml-auto" />
					<div className="relative flex w-1/2 h-[150vh] items-center justify-left text-white bg-black ml-auto">
						<div>
							<div className="text-left w-3/4">
								<h1 className={TEXT_STYLES.sectionTitle}>
									面倒な設定は不要
								</h1>
								<p className={`${TEXT_STYLES.subtitle} mb-2`}>
									専用のセットアップツールを搭載した機器を接続するだけで、すぐにゲーム配信を開始できます。
								</p>
								<Image
									src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/ssd.webp`}
									alt="desktop"
									width={500}
									height={300}
									className="w-full rounded-lg mb-2"
								/>
								<li className={TEXT_STYLES.paragraph}>配信ソフト・ゲーム環境に合わせてカスタマイズ</li>
								<li className={TEXT_STYLES.paragraph}>アップデートの手間なし、いつでも安定動作</li>
								<li className={TEXT_STYLES.paragraph}>動画編集とYouTubeアップロードまで一括サポート</li>
							</div>
						</div>
					</div>
					<div className="relative flex w-1/2 h-[130vh] items-center justify-left text-white bg-black ml-auto">
						<div className="text-left w-3/4">
							<section className="">
								<h2 className={TEXT_STYLES.sectionTitle}>
									ゲーム環境の<br />立ち上げサービスの流れ
								</h2>
								<div className="space-y-8 mt-5">
									<article>
										<h3 className={TEXT_STYLES.articleTitle}>1. お問い合わせ</h3>
										<p className={TEXT_STYLES.paragraph}>まずはご連絡ください。</p>
									</article>
									<article>
										<h3 className={TEXT_STYLES.articleTitle}>2. 初回訪問</h3>
										<p className={TEXT_STYLES.paragraph}>ご自宅の環境を確認し、最適なセットアップを提案します。</p>
									</article>
									<article>
										<h3 className={TEXT_STYLES.articleTitle}>3. 設置・立ち上げ</h3>
										<p className={TEXT_STYLES.paragraph}>
											PCの搬入、設置、動作確認と説明を行います。
										</p>
									</article>
									<article>
										<h3 className={TEXT_STYLES.articleTitle}>4. アフターサポート</h3>
										<p className={TEXT_STYLES.paragraph}>
											機器の不具合、タイトルの追加方法などサポートいたします。
										</p>
									</article>
									<button
										onClick={() => setInquiryModalOpen(true)}
										className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition cursor-pointer"
									>
										詳細を見る
									</button>
								</div>
							</section>
						</div>
					</div>
					<Footer onOpenLegalModal={(type)=>isLegalModalOpen(type)}/>
				</main >
			</div >
		</>
	)
}
