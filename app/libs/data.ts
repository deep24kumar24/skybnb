enum ListingCategoryType {
	ENTIRE_PLACE = 0,
	ENTIRE_UNIT = 1,
	PRIVATE_ROOM = 2,
	SHARED_ROOM = 3,
}
type ListingCategory = {
	id: ListingCategoryType;
	label: string;
	subLabel: string;
};

export const ListingCategories: ListingCategory[] = [
	{
		id: ListingCategoryType.ENTIRE_PLACE,
		label: "Entire Place",
		subLabel: "You are renting the whole place to oen tenant/family.",
	},
	{
		id: ListingCategoryType.ENTIRE_UNIT,
		label: "Entire Unit",
		subLabel: "You are renting one unit to one tenant/family at one time.",
	},
	{
		id: ListingCategoryType.PRIVATE_ROOM,
		label: "Private Room",
		subLabel: "You are renting private room to one tenant at one time.",
	},
	{
		id: ListingCategoryType.SHARED_ROOM,
		label: "Shared Room",
		subLabel: "You are renting a room to multiple tenants at one time.",
	},
];
