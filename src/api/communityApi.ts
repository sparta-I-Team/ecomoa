import { createClient } from "@/utlis/supabase/client";
import { PostCreateType, Post } from "@/types/community";

const supabase = createClient();

export const communityApi = {
  // 게시글 생성
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

  // 게시글 목록 가져오기
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

  // 댓글 추가
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
      .select("*,user_info(user_nickname)")
      .single();

    // console.log("Data =>", data);
    if (error) {
      return { error: error.message, data: null };
    }

    return { data, error };
  },

  // 게시글 수정
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

  // 게시글 삭제
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

  // 댓글 조회 (게시글 ID 기준)
  getCommentsByPostId: async (post_id: string) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*,user_info(user_nickname)")
        .eq("post_id", post_id)

        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching comments:", error);
      return { error: "댓글을 불러오는 데 실패했습니다." };
    }
  },

  // 댓글 수정
  updateComment: async (comment_id: string, updatedContent: string) => {
    const { error } = await supabase
      .from("comments")
      .update({
        comment_content: updatedContent
      })
      .eq("comment_id", comment_id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  },

  // 댓글 삭제
  deleteComment: async (comment_id: string) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", comment_id);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  }
};
