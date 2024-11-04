export interface ModalStoreType {
  isOpen: boolean;
  modalContent: React.ReactNode | null;
  type: "autoClose" | "persistent" | string;
  time: number;
  openModal: (content: React.ReactNode, type: string, time: number) => void;
  closeModal: () => void;
}

export type ModalType = "autoClose" | "persistent" | null;
