import { Challenge, Post, PostCreateType } from "@/types/community";
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
        params: { type, isDeleted: false }
        // 타입 옆에
      }
    ]);

    if (error) throw error;
    console.log("data? :", data);

    const { data: postData, error: postDataError } = await supabase
      .from("posts")
      .select("post_id")
      .eq("user_id", user_id)
      .eq("post_title", title)
      .single();
    if (postDataError) {
      throw postDataError;
    }
    return postData;
  },

  // 읽어오는 메서드
  getPost: async (type: string) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*, user_info(user_nickname), post_img")
        .eq("params", JSON.stringify({ type, isDeleted: false }));
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
  },

  update: async (editedPost: Post) => {
    const { error } = await supabase
      .from("posts")
      .update({
        post_title: editedPost.post_title,
        price: editedPost.price,
        post_content: editedPost.post_content,

        location: editedPost.location,
        post_img: editedPost.post_img
      })
      .eq("post_id", editedPost.post_id);

    if (error) {
      throw error;
    }
    return { error };
  },
  delete: async (post: Post) => {
    const { error } = await supabase
      .from("posts")
      .update({
        params: { type: post.params.type, isDeleted: true }
      })
      .eq("post_id", post.post_id);
    if (error) {
      throw error;
    }
    return { error };
  },
  updateForChallenge: async (updatedChallenge: Challenge) => {
    const { error } = await supabase
      .from("challenges")
      .update({
        selected_options: updatedChallenge.selected_options,
        image_urls: updatedChallenge.image_urls,
        content: updatedChallenge.content
      })
      .eq("chall_id", updatedChallenge.chall_id);

    if (error) {
      throw error;
    }
    return { error };
  },
  deleteForChallenge: async (deletedChallenge: Challenge) => {
    const { error } = await supabase
      .from("challenges")
      .update({
        params: { type: deletedChallenge.params.type, isDeleted: true }
      })
      .eq("chall_id", deletedChallenge.chall_id);
    if (error) {
      throw error;
    }
    return { error };
  }
};
