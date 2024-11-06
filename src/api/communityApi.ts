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
  //읽어오는 메서드
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
  }

  //   imageUpload:수파베이스 스토리지에 이미지 업로드 함수 구현
};
