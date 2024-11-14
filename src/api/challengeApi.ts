import {
  InsertChallengeParams,
  UpdateChallengeParams
} from "@/types/challengesType";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createClient } from "@/utlis/supabase/client";

// dayjs 플러그인 설정
dayjs.extend(utc);
dayjs.extend(timezone);

const supabase = createClient();

export const challengesApi = {
  create: async (params: InsertChallengeParams) => {
    try {
      const { data: latestChallenge, error: fetchError } = await supabase
        .from("challenges")
        .select("created_at")
        .eq("user_id", params.userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (latestChallenge) {
        const lastChallengeDate = dayjs(latestChallenge.created_at)
          .tz("Asia/Seoul")
          .format("YYYY-MM-DD");

        const todayDate = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");

        if (lastChallengeDate === todayDate) {
          throw new Error(
            "이미 오늘의 챌린지를 제출하셨습니다. 내일 다시 도전해주세요!"
          );
        }
      }

      const imageUrls = await Promise.all(
        params.images.map(async (file) => {
          const fileName = `${params.userId}/${Date.now()}`;
          const { error } = await supabase.storage
            .from("challenges")
            .upload(fileName, file);

          if (error) throw error;

          const {
            data: { publicUrl }
          } = supabase.storage.from("challenges").getPublicUrl(fileName);

          return publicUrl;
        })
      );

      const { data: userInfo, error: userError } = await supabase
        .from("user_info")
        .select("user_point")
        .eq("user_id", params.userId)
        .single();

      if (userError) throw userError;

      const currentPoint = userInfo?.user_point || 0;
      const newPoint = currentPoint + params.point;

      const { error: updateError } = await supabase
        .from("user_info")
        .update({ user_point: newPoint })
        .eq("user_id", params.userId);

      if (updateError) throw updateError;

      const { data: challenge, error: insertError } = await supabase
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

      if (insertError) throw insertError;

      return challenge;
    } catch (error) {
      console.error("챌린지 생성 오류:", error);
      throw error;
    }
  },

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
  },

  readByChallengeId: async (challengeId: string) => {
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
      .eq("chall_id", challengeId)
      .single();

    if (error) throw error;
    return data;
  },

  update: async (params: UpdateChallengeParams) => {
    try {
      // 삭제할 이미지 처리
      if (params.deletedImages?.length) {
        for (const imageUrl of params.deletedImages) {
          const fileName = imageUrl.split("/").pop();
          if (fileName) {
            const { error: deleteError } = await supabase.storage
              .from("challenges")
              .remove([fileName]);

            if (deleteError) throw deleteError;
          }
        }
      }

      // 새로운 이미지 업로드
      const newImageUrls = await Promise.all(
        params.images.map(async (file) => {
          const fileName = `${Date.now()}_${file.name}`;
          const { error } = await supabase.storage
            .from("challenges")
            .upload(fileName, file);

          if (error) throw error;

          const {
            data: { publicUrl }
          } = supabase.storage.from("challenges").getPublicUrl(fileName);

          return publicUrl;
        })
      );

      // 기존 이미지와 새 이미지 합치기
      const finalImageUrls = [
        ...(params.existingImages || []),
        ...newImageUrls
      ];

      // 챌린지 데이터 업데이트
      const { data: updatedChallenge, error: updateError } = await supabase
        .from("challenges")
        .update({
          content: params.content,
          image_urls: finalImageUrls,
          selected_options: params.selectedOptions,
          updated_at: new Date().toISOString()
        })
        .eq("chall_id", params.challengeId)
        .select()
        .single();

      if (updateError) throw updateError;

      return updatedChallenge;
    } catch (error) {
      console.error("챌린지 수정 오류:", error);
      throw error;
    }
  },
  delete: async (challengeId: string) => {
    try {
      const { error } = await supabase
        .from("challenges")
        .delete()
        .eq("chall_id", challengeId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error("챌린지 삭제 중 오류:", error);
      throw error;
    }
  }
};
