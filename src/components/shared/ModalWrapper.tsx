import { useModalStore } from "@/zustand/modalStore";
import { ReactNode } from "react";

export const ModalWrapper = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModalStore();

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
