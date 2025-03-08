import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const ogImage = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/bg.webp`;

export const metadata: Metadata = {
	metadataBase: new URL('https://your-domain.com'),
	title: {
		default: 'X-MODE - シニアのeスポーツ環境構築サポート',
		template: '%s | X-MODE'
	},
	description: 'シニアのeスポーツ環境構築サービス。専門スタッフが、年齢に関係なく誰もが楽しめるゲーミング環境を丁寧にサポートします。',
	openGraph: {
		title: 'X-MODE - シニア世代のためのeスポーツ環境構築',
		description: 'シニア世代のためのeスポーツ環境構築サービス。専門スタッフが、年齢に関係なく誰もが楽しめるゲーミング環境を丁寧にサポートします。',
		type: 'website',
		locale: 'ja_JP',
		url: 'https://your-domain.com',
		siteName: 'X-MODE',
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'X-MODE - シニア世代のeスポーツ環境構築',
		description: 'シニア世代のためのeスポーツ環境構築サービス。専門スタッフが、年齢に関係なく誰もが楽しめるゲーミング環境を丁寧にサポートします。',
		images: [ogImage]
	},
	keywords: [
		'シニアeスポーツ',
		'高齢者ゲーミング',
		'ゲーミングPC設置',
		'初心者eスポーツ',
		'年配者ゲーム環境',
		'eスポーツサポート',
		'ゲーミング初心者',
		'簡単ゲーム配信'
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		}
	},
	formatDetection: {
		telephone: false,
	},
	verification: {
		google: 'your-google-site-verification-code',
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}