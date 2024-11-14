export type ModalType = "alert" | "confirm" | "custom";

interface ButtonText {
  confirm?: string;
  cancel?: string;
}

export interface ModalStoreType {
  isOpen: boolean;
  content: React.ReactNode | null;
  type: ModalType;
  autoClose?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  buttonText?: ButtonText;
  className?: string | null;
}
