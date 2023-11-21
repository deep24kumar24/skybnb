import { create } from "zustand";

interface RentModatStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useRentModal = create<RentModatStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useRentModal;
