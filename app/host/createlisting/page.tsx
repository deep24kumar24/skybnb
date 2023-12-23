"use client";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ListingCategories } from "@/app/libs/data";
import Heading from "@/app/components/Heading";
import CountrySelect from "@/app/components/Inputs/CountrySelect";
import Counter from "@/app/components/Inputs/Counter";
import ImageUpload from "@/app/components/Inputs/ImageUpload";
import Input from "@/app/components/Inputs/Input";
import Container from "@/app/components/Container";
import Button from "@/app/components/Button";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const router = useRouter();

	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(
		() =>
			dynamic(() => import("../createlisting/Map"), {
				ssr: false,
			}),
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.PRICE) return onNext();

		setIsLoading(true);

		axios
			.post("api/listings", data)
			.then(() => {
				toast.success("Listing is created");
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
			})
			.catch(() => {
				toast.error("Something went wrong");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}
		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return "Back";
	}, [step]);

	let bodyContent;

	switch (step) {
		case STEPS.CATEGORY:
			{
				bodyContent = (
					<div className="flex flex-col gap-8 text-center">
						<Heading
							title="Which of these best describes your place?"
							subtitle="Pick a Category"
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
							{ListingCategories.map((item) => (
								<div
									key={item.id}
									className="col-span-1 ">
									{item.label}
								</div>
							))}
						</div>
					</div>
				);
			}
			break;
		case STEPS.LOCATION:
			bodyContent = (
				<div className="flex flex-col gap-8">
					<Heading
						title="Where is your place located?"
						subtitle="Help guests find you!"
					/>

					<CountrySelect
						value={location}
						onChange={(value) => setCustomValue("location", value)}
					/>

					{/* <Map center={location?.latlng} /> */}
				</div>
			);
			break;
		case STEPS.INFO:
			bodyContent = (
				<div className="flex flex-col gap-8">
					<Heading
						title="Share some basics about your place"
						subtitle="What amenities you have?"
					/>
					<Counter
						title="Guests"
						subtitle="How many guets do you allow?"
						value={guestCount}
						onChange={(value) => setCustomValue("guestCount", value)}
					/>
					<Counter
						title="Rooms"
						subtitle="How many rooms do you have?"
						value={roomCount}
						onChange={(value) => setCustomValue("roomCount", value)}
					/>

					<Counter
						title="Bathrooms"
						subtitle="How many bathrooms do you have?"
						value={bathroomCount}
						onChange={(value) => setCustomValue("bathroomCount", value)}
					/>
				</div>
			);
			break;
		case STEPS.IMAGES:
			bodyContent = (
				<div className="flex flex-col gap-8">
					<Heading
						title="Add a photo of your place"
						subtitle="Show guests how the place looks like"
					/>

					<ImageUpload
						value={imageSrc}
						onChange={(value) => setCustomValue("imageSrc", value)}
					/>
				</div>
			);

			break;
		case STEPS.DESCRIPTION:
			bodyContent = (
				<div className="flex flex-col gap-8">
					<Heading
						title="How would you descirbe your place?"
						subtitle="Short and sweet works the best!"
					/>
					<Input
						id="title"
						label="Title"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
					/>
					<hr />
					<Input
						id="description"
						label="Description"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
					/>
				</div>
			);
			break;
		case STEPS.PRICE:
			bodyContent = (
				<div className="flex flex-col gap-8">
					<Heading
						title="Now, set your price"
						subtitle="How much you charge per night?"
					/>
					<Input
						id="price"
						label="Price"
						disabled={isLoading}
						register={register}
						errors={errors}
						formatPrice
						type="number"
						required
					/>
				</div>
			);

			break;
	}

	return (
		<Container>
			{bodyContent}
			<div className="fixed bottom-0 left-0 right-0 p-6 flex-1 flex flex-row items-center bg-white">
				<div className="h-1 bg-gray-300 w-full absolute top-0 left-0 right-0">
					<div
						className="bg-black h-full"
						style={{
							transition: "width 0.5s",
							width: `${((step + 1) * 100) / 6}%`,
						}}></div>
				</div>
				<div
					className="font-bold text-lg cursor-pointer hover:underline"
					onClick={onBack}>
					Back
				</div>
				<div className="w-40 ml-auto">
					<Button
						label="Next"
						onClick={onNext}
					/>
				</div>
			</div>
		</Container>
	);
};

export default RentModal;
