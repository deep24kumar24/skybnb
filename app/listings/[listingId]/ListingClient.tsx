"use client";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/Navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

interface ListingClientProps {
	reservations?: Reservation[];
	listing: Listing & {
		user: User;
	};
	currentUser: User;
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser,
	reservations = [],
}) => {
	const loginModal = useLoginModal();
	const router = useRouter();

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState(initialDateRange);

	const onCreateREservation = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		setIsLoading(true);

		axios
			.post("api/reservations", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing.id,
			})
			.then(() => {
				toast.success("Listing Reserved");
				setDateRange(initialDateRange);
				// Redirect to Trips
				router.refresh();
			})
			.catch(() => {
				toast.error("Something went wrong!");
			});
	}, [
		totalPrice,
		dateRange,
		listing?.id,
		router,
		currentUser,
		router,
		loginModal,
	]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(
				dateRange.startDate,
				dateRange.endDate
			);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			}
		}
	}, []);

	const category = useMemo(() => {
		return categories.find(
			(item) => item.label == listing.category
		);
	}, [listing.category]);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>

					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo
							user={listing.user}
							createdAt={listing.createdAt}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
