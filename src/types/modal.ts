export interface ModalStoreType {
  isOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}
