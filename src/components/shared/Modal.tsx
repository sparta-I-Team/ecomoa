"use client";
import { useModal } from "@/zustand/modalStore";
import { useEffect } from "react";

export const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-h-[90vh] overflow-y-auto w-full max-w-[400px] transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-x-hidden">{modalContent}</div>
      </div>
    </div>
  );
};
