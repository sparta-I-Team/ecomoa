"use server";

import { createClient } from "@supabase/supabase-js";
// Service Role Key를 사용하는 서버 측 Supabase 클라이언트 생성
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

// 회원탈퇴
export const deleteUser = async (userId: string) => {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error("회원 탈퇴 에러:", error);
  }

  return true;
};
