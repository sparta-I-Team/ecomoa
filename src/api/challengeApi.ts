import { InsertChallengeParams } from "@/types/challengesType";
import { createClient } from "@/utlis/supabase/client";

const supabase = createClient();

export const challengesApi = {
  create: async (params: InsertChallengeParams) => {
    try {
      //이미지 관련 요청임
      const imageUrls = await Promise.all(
        params.images.map(async (file) => {
          const fileName = `${params.userId}/${Date.now()}`;
          const { data, error } = await supabase.storage
            .from("challenges")
            .upload(fileName, file);

          if (error) throw error;

          const {
            data: { publicUrl }
          } = supabase.storage.from("challenges").getPublicUrl(fileName);

          return publicUrl;
        })
      );

      //포인트 관련 요청임
      const { data: userInfo, error: userError } = await supabase
        .from("user_info")
        .select("user_point")
        .eq("user_id", params.userId)
        .single();

      if (userError) {
        console.error("기존 포인트 조회 에러:", userError);
        throw userError;
      }

      const currentPoint = userInfo?.user_point || 0;
      const newPoint = currentPoint + params.point;

      const { error: updateError } = await supabase
        .from("user_info")
        .update({ user_point: newPoint })
        .eq("user_id", params.userId);

      if (updateError) {
        console.error("포인트 업데이트 에러:", updateError);
        throw updateError;
      }

      // 챌린지 테ㅐ이블에 로우 생성
      const { data, error } = await supabase
        .from("challenges")
        .insert({
          user_id: params.userId,
          co2: params.carbon,
          content: params.content,
          image_urls: imageUrls,
          selected_options: params.selectedOptions,
          point: params.point
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("데이터 삽입 오류입니다.", error);
      throw error;
    }
  },

  // 챌린지 목록 조회 함수임
  read: async () => {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  readByUserId: async (userId: string) => {
    const { data, error } = await supabase
      .from("challenges")
      .select(
        `
        *,
        user_info:user_id (
          user_nickname
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
};
