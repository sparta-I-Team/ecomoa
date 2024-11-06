import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createClient } from "@/utlis/supabase/client";

// dayjs 플러그인 설정
dayjs.extend(utc);
dayjs.extend(timezone);

const supabase = createClient();

export const calendarApi = {
  getByDateRange: async (
    startDate: string,
    endDate: string,
    userId: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .eq("user_id", userId)
        .gte("created_at", startDate)
        .lte("created_at", endDate)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("기간별 챌린지 조회 오류:", error);
      throw error;
    }
  }
};
