import { create } from "zustand";

interface RegisterModatStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useRegisterModal = create<RegisterModatStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
