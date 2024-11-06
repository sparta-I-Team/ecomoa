import { InsertChallengeParams } from "@/types/challengesType";
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

      console.log(latestChallenge);
      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (latestChallenge) {
        const lastChallengeDate = dayjs(latestChallenge.created_at)
          .tz("Asia/Seoul")
          .format("YYYY-MM-DD");

        const todayDate = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");

        console.log("Date check:", {
          lastChallengeDate,
          todayDate,
          isSameDay: lastChallengeDate === todayDate
        });

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
  }
};
