"use client";

import { useEffect } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { ModalContent } from "./ModalContent";
import { useModalStore } from "@/zustand/modalStore";

export const Modal = () => {
  const { isOpen, autoClose, closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(closeModal, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, closeModal, autoClose]);

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent />
    </ModalWrapper>
  );
};
