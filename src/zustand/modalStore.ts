import { create } from "zustand";
import { ModalStoreType } from "@/types/modal";

type ModalStore = ModalStoreType & {
  openModal: (params: Partial<ModalStoreType>) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,
  type: "custom",
  autoClose: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  buttonText: undefined,
  openModal: (params) => set({ isOpen: true, ...params }),
  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      type: "custom",
      autoClose: undefined,
      onConfirm: undefined,
      onCancel: undefined,
      buttonText: undefined
    })
}));
