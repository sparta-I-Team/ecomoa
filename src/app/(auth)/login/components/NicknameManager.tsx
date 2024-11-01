"use client";

import { userStore } from "@/zustand/userStore";
import { useEffect, useState } from "react";
import NicknameModal from "./NicknameModal";
import { useUserInfo } from "@/hooks/useUserInfo";

const NicknameManager = () => {
  const { user } = userStore();
  const { data: userInfo, isFetching, isLoading } = useUserInfo();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (userInfo?.params?.firstTag === false) {
      setModalOpen(true);
    }
  }, [userInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{isModalOpen && <NicknameModal />}</div>;
};

export default NicknameManager;
