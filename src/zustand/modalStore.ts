import { ModalStoreType } from "@/types/modal";
import { create } from "zustand";

export const useModalStore = create<ModalStoreType>((set) => ({
  isOpen: false,
  modalContent: null,
  type: "",
  time: 0,
  openModal: (content, type = "", time = 0) =>
    set({
      isOpen: true,
      modalContent: content,
      type,
      time
    }),
  closeModal: () =>
    set({
      isOpen: false,
      modalContent: null,
      type: ""
    })
}));
