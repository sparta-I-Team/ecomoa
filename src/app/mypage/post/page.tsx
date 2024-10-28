import React from "react";
import Myposts from "../components/Myposts";
import { getUser } from "@/api/auth-actions";

const MyPostPage = async () => {
  const user = await getUser();
  if (!user) return;
  return (
    <div>
      <Myposts user={user} />
    </div>
  );
};

export default MyPostPage;
