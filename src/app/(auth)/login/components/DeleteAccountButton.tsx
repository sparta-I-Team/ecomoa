"use client";

import { User } from "@supabase/supabase-js";
import { deleteUser } from "../../delete-action";
import { useRouter } from "next/navigation";

interface DeleteAccountProps {
  user: User;
}

const DeleteAccountButton = ({ user }: DeleteAccountProps) => {
  const router = useRouter();
  const handleDeleteAccount = async () => {
    const userId = user.id;

    try {
      window.confirm("회원 탈퇴하시겠습니까?");
      await deleteUser(userId);
      router.push("/login");
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  return <button onClick={handleDeleteAccount}>회원 탈퇴</button>;
};

export default DeleteAccountButton;
