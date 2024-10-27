import React from "react";
import DeleteAccountButton from "../(auth)/login/components/DeleteAccountButton";
import LogoutButton from "../(auth)/login/components/LogoutButton";
import { getUser } from "@/api/auth-actions";
import UserInfoCard from "./components/UserInfoCard";
import Myposts from "./components/Myposts";

const Mypage = async () => {
  const user = await getUser();
  if (!user) return;
  console.log("current user---------->", user);

  return (
    <div className="w-1/3 flex flex-col m-auto">
      <h1>마이페이지</h1>
      <p>포인트와 등급을 확인해보세요!</p>
      <UserInfoCard user={user} />
      <DeleteAccountButton user={user} />
      <LogoutButton />
      <Myposts user={user} />
    </div>
  );
};

export default Mypage;
