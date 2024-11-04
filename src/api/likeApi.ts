import { Like } from "@/types/like";
import { createClient } from "@/utlis/supabase/client";

const supabase = createClient();

export const likeApi = {
  getLikeStatus: async (
    userId: string,
    postId: string
  ): Promise<Like | null> => {
    const { data, error } = await supabase
      .from("likes")
      .select()
      .eq("user_id", userId)
      .eq("post_id", postId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  toggleLike: async (
    userId: string,
    postId: string,
    currentStatus: boolean
  ): Promise<void> => {
    const { data: existingLike } = await supabase
      .from("likes")
      .select()
      .eq("user_id", userId)
      .eq("post_id", postId)
      .maybeSingle();

    if (existingLike) {
      /* 나중에 공통으로 빼자 */
      const seoulTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3
      });
      /*                    */

      const { error } = await supabase
        .from("likes")
        .update({ status: !currentStatus, updated_at: seoulTime })
        .eq("user_id", userId)
        .eq("post_id", postId);

      if (error) throw error;
    } else {
      const { error } = await supabase.from("likes").insert({
        user_id: userId,
        post_id: postId,
        status: true
      });

      if (error) throw error;
    }
  }
};
