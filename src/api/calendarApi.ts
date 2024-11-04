import { createClient } from "@/utlis/supabase/client";

const supabase = createClient();

export const calendarApi = {
  // 특정 기간의 챌린지 데이터 조회
  getByDateRange: async (
    startDate: string,
    endDate: string,
    userId: string
  ) => {
    try {
      // startDate에 시작 시간, endDate에 종료 시간 추가
      const startDateTime = `${startDate}T00:00:00.000Z`;
      const endDateTime = `${endDate}T23:59:59.999Z`;

      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_id", userId)
        .gte("created_at", startDateTime)
        .lte("created_at", endDateTime)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("기간별 챌린지 조회 오류:", error);
      throw error;
    }
  }
};
