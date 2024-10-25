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
