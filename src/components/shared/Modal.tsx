"use client";
import { useModalStore } from "@/zustand/modalStore";
import { useEffect } from "react";

export const Modal = () => {
  const { isOpen, modalContent, closeModal, type, time } = useModalStore();

  useEffect(() => {
    if (isOpen && type === "autoClose") {
      const timer = setTimeout(() => {
        closeModal();
      }, time);

      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal, type, time]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-h-[80vh] overflow-y-auto  inline-block w-auto min-w-[280px] transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-x-hidden relative">
          {modalContent}

          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          ></button>
        </div>
      </div>
    </div>
  );
};
