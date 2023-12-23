import { create } from "zustand";

interface CreateListingStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useCreateListingModal = create<CreateListingStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCreateListingModal;
