"use server";

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

// 내가 쓴 글 가져오기
export const getMyPosts = async (userId: string) => {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("내가 쓴 글 가져오기 오류", error);
    return null;
  }
  return posts || [];
};

// 닉네임 중복 검사
export const checkNicknameAvailability = async (newNickname: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_info")
    .select("user_nickname")
    .eq("user_nickname", newNickname)
    .limit(1);

  if (error) {
    console.error("닉네임 중복 검사 오류", error);
    return null;
  }
  return data.length === 0; // 사용 가능하면 true, 중복이면 false
};
