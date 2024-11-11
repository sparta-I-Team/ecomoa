import { Post, PostCreateType } from "@/types/community";
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
  }: PostCreateType) => {
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
      console.log("id #:", id);
      const { data, error } = await supabase
        .from("posts")
        .select("*, user_info(user_nickname), post_img")
        .eq("post_id", id)
        .single();
      console.log("supabase data :", data);
      if (error) {
        throw new Error(error.message);
      }

      return { data: data as Post | null };
    } catch {
      return { data: null, error: "게시글을 불러오는 데 실패했습니다." };
    }
  },
  // 댓글 추가하기
  addComment: async (
    post_id: string,
    user_id: string,
    comment_content: string
  ) => {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id,
          user_id,
          comment_content,
          created_at: new Date().toISOString()
        }
      ])
      .single();

    if (error) {
      return { error: error.message, data: null };
    }

    return { data, error: null };
  }
};