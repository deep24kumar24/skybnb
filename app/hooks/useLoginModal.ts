import { create } from "zustand";

interface LoginModatStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useLoginModal = create<LoginModatStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
