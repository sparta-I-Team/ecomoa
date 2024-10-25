"use server";

import { UserInfo } from "@/types/userInfoType";
import { createClient } from "@/utlis/supabase/server";

export const getUserInfo = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_info")
    .select()
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

// 닉네임 업데이트
export const updateNickname = async ({
  userId,
  newNickname
}: {
  userId: string;
  newNickname: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_info")
    .update({ user_nickname: newNickname })
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("닉네임 업데이트 오류", error);
    return null;
  }
  return data;
};
