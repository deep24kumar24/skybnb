"use client";

import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
	listingId: string;
	currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	listingId,
	currentUser,
}) => {
	const hasFavorited = false;
	const toggleFavorite = () => {};

	return (
		<div
			onClick={toggleFavorite}
			className="relative hover:opacity-80 transition cursor-pointer">
			<AiOutlineHeart
				className="fill-white absolute -top-[2px] -right-[2px]"
				size={28}
			/>
			<AiFillHeart
				className={
					hasFavorited
						? "fill-rose-600"
						: "fill-neutral-500/70"
				}
				size={24}
			/>
		</div>
	);
};

export default HeartButton;
