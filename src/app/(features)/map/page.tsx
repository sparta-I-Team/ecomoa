"use client";
import { Modal } from "@/components/shared/Modal";
import { useModalStore } from "@/zustand/modalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    openModal({
      type: "alert",
      content: <>추후 업데이트 예정입니다</>,
      autoClose: 2000
    });
    const timer = setTimeout(() => {
      closeModal();
      router.push("/");
    }, 800);

    return () => clearTimeout(timer);
  }, [router]);

  return <Modal></Modal>;
};

export default Page;
