"use client";
import React from "react";
import Image from "next/image";

const SimpleBackgroundAnimation: React.FC = () => {
	return (
		<div className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none">
			<div className="relative w-full h-full">
				<Image
					src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/bg.webp`}
					alt="Background"
					fill
					style={{ objectFit: "cover" }}
					priority
				/>
			</div>
		</div>
	);
};

export default SimpleBackgroundAnimation;