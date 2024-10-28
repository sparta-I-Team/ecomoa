import { ModalStoreType } from "@/types/modal";
import { create } from "zustand";

export const useModal = create<ModalStoreType>((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null })
}));
