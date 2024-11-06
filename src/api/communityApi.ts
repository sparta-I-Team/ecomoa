// communityApi.ts
import { Post } from "@/types/community";
import { createClient } from "@/utlis/supabase/client";

const supabase = createClient();

export const communityApi = {
  create: async ({
    user_id,
    title,
    content,
    formattedUrls,
    price,
    location,
    type
  }: Type) => {
    const { data, error } = await supabase.from("posts").insert([
      {
        user_id,
        post_title: title,
        post_content: content,
        created_at: new Date().toISOString(),
        post_img: formattedUrls,
        price,
        location,
        params: { type }
      }
    ]);

    if (error) throw error;
    return data;
  },
  // 읽어오는 메서드
  getPost: async (type: string) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, user_info(user_nickname), post_img")
        .eq("params", JSON.stringify({ type }));
      if (error) {
        throw error;
      }

      return { data: data as Post[] };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { error: "게시글을 불러오는 데 실패했습니다." };
    }
  },

  // 게시글 ID로 가져오는 메서드
  getPostById: async (
    id: string
  ): Promise<{ data: Post | null; error?: string }> => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, user_info(user_nickname), post_img")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { data: data as Post | null };
    } catch {
      return { data: null, error: "게시글을 불러오는 데 실패했습니다." };
    }
  }
};
