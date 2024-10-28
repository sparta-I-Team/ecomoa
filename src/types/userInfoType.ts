import { User } from "@supabase/supabase-js";

export interface UserInfo {
  user_email: string;
  user_nickname: string;
  user_avatar: string;
  user_point: number;
  created_at: string;
  updated_at: string;
}

export interface ProfileProps {
  user: User;
}

export interface FormData {
  nickname: string;
}

export interface MyPosts {
  post_id: string;
  user_id: string;
  post_title: string;
  post_content: string;
  post_img: string;
  post_category: string;
  created_at: string;
  updated_at: string;
}
