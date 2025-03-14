import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  component: React.ReactNode;
  open: () => void;
  close: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  component: null,
  open: () => set({ isOpen: true }),
  close: () => set({ component: null, isOpen: false }),
}));

export default useModalStore;

export {};
