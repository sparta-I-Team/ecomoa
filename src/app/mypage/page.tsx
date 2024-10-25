import React from "react";
import { getUser } from "../../api/actions";
import DeleteAccountButton from "../(auth)/login/components/DeleteAccountButton";
import LogoutButton from "../(auth)/login/components/LogoutButton";

const Mypage = async () => {
  const user = await getUser();
  if (!user) return;
  console.log(user);
  return (
    <div>
      <p>mypage</p>
      {user?.email}
      <DeleteAccountButton user={user} />
      <LogoutButton />
    </div>
  );
};

export default Mypage;
