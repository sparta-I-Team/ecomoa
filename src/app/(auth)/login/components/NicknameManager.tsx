"use client";

import { useEffect, useState } from "react";
import NicknameModal from "./NicknameModal";
import { useUserInfo } from "@/hooks/useUserInfo";
import { userStore } from "@/zustand/userStore";

const NicknameManager = () => {
  const { user } = userStore();
  const { data: userInfo, isLoading } = useUserInfo();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user && userInfo?.params?.firstTag === false) {
      setModalOpen(true);
    }
  }, [userInfo, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isModalOpen && (
        <NicknameModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default NicknameManager;
