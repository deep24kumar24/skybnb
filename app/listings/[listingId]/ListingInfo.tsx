"use client";

import Avatar from "@/app/components/Avatar";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map"), {
	ssr: false,
});

interface ListingInfoProps {
	user: User;
	description: string;
	roomCount: number;
	guestCount: number;
	bathroomCount: number;
	locationValue: string;
	createdAt: Date;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	user,
	description,
	roomCount,
	guestCount,
	bathroomCount,
	locationValue,
	createdAt,
	category,
}) => {
	const { getByValue } = useCountries();
	const country = getByValue(locationValue);

	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div>
				<div className="text-xl font-semibold flex flex-row items-center gap-2">
					<div>Entire home in {country?.label}</div>
				</div>
				<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>

			<hr />

			<div className="flex flex-col gap-2">
				<div className="text-xl font-semibold flex flex-row items-center gap-2">
					<Avatar src={user?.image} />
					<div>
						Hosted by {user?.name}
						<div className="font-light text-base">
							Since {createdAt.toDateString()}
						</div>
					</div>
				</div>
			</div>

			<hr />

			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}

			<hr />

			<div
				className="text-lg font-light text-neutral-500"
				dangerouslySetInnerHTML={{
					__html: description,
				}}></div>

			<hr />

			<Map center={country?.latlng} />
		</div>
	);
};

export default ListingInfo;
