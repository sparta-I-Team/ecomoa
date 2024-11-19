import { Like } from "@/types/like";
import { createClient } from "@/utlis/supabase/client";

const supabase = createClient();

export const likeApi = {
  // 좋아요 개수를 가져오는 함수
  getLikeCount: async (postId: string): Promise<Like[]> => {
    // console.log("여기는 api함수 =>", postId);
    const { data, error } = await supabase
      .from("likes")
      .select()
      .eq("post_id", postId)
      .eq("status", true); // 좋아요 상태가 true인 것만

    if (error) {
      console.error(error);
      throw error;
    }

    return data; // 좋아요 개수 (배열 길이)
  },

  getLikeStatus: async (userId: string, postId: string) => {
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
  ) => {
    const { data: existingLike } = await supabase
      .from("likes")
      .select()
      .eq("user_id", userId)
      .eq("post_id", postId)
      .maybeSingle();

    if (existingLike) {
      const { error } = await supabase
        .from("likes")
        .update({ status: !currentStatus })
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
