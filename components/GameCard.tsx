import Image from "next/image";
export interface GameInfo {
	title: string;
	description: string;
	images: string[];
}
interface GameCardProps {
	title: string;
	description: string;
	imageUrl: string;
	onClick: (game: GameInfo) => void;
	gameInfo: GameInfo;
}
const GameCard: React.FC<GameCardProps> = ({ title, description, imageUrl, onClick, gameInfo }) => {
	return (
		<article className="p-4">
			<h3 className="text-xl ml-1 text-gray-300 font-bold">{title}</h3>
			<p className="text-xl ml-1 text-gray-500 mb-2">{description}</p>
			<div className="overflow-hidden rounded-lg cursor-pointer" onClick={() => onClick(gameInfo)}>
				<Image
					src={imageUrl}
					alt={title}
					width={500}
					height={300}
					className="w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
				/>
			</div>
		</article>
	);
};

export default GameCard;
