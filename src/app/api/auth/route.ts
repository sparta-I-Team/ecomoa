import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";

export const DELETE = async (req: NextRequest) => {
  // 여기다가 로직 태우면 될듯?
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    console.log("Aaaaa");
    const { userId } = await req.json();
    console.log("uesrid!!?!@?@! ", userId);
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    console.log("api rotues data : ", data);

    if (error) {
      console.log(error);
      return NextResponse.json({ status: 500, message: "사용자 삭제 실패" });
    }

    return NextResponse.json({ status: 200, message: "사용자 삭제 성공" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "서버 오류" });
  }
};
