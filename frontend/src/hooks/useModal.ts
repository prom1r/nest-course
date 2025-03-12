import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  component: React.ReactNode;
  open: () => void;
  close: () => void;
}

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  component: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useModal;

export {};
