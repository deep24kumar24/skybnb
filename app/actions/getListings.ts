import prisma from "@/app/libs/prismadb";

export default async function getListings() {
	try {
		const listings = await prisma.listing.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		console.log("~~~>>.", listings);

		return listings;
	} catch (error: any) {
		console.log(error);
		return [];
	}
}
