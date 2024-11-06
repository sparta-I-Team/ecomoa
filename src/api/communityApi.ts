import { createClient } from "@/utlis/supabase/client";

const supabase = createClient();

interface Type {
  user_id: string;
  title: string;
  content: string;
  formattedUrls: string;
}

export const communityApi = {
  create: async ({ user_id, title, content, formattedUrls }: Type) => {
    const { data, error } = await supabase.from("posts").insert([
      {
        user_id,
        post_title: title,
        post_content: content,
        created_at: new Date().toISOString(),
        post_img: formattedUrls
      }
    ]);

    if (error) throw error;
    return data;
  }
};
