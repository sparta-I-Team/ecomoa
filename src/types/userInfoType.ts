import { User } from "@supabase/supabase-js";

export interface UserInfo {
  user_email: string;
  user_nickname: string;
  user_avatar: string;
  user_point: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  params: {
    firstTag: boolean;
  };
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
  comment: number;
}

export interface Bookmarks {
  bookmark_id: string;
  user_id: string;
  post_id: string;
  type: string | null;
  posts: {
    like: string | null;
    comment: null;
    post_id: string;
    user_id: string;
    post_img: string | null;
    created_at: string;
    post_title: string;
    updated_at: string;
    post_content: string;
    post_category: string | null;
  };
}

export type UserInfoNickname = Pick<UserInfo, "user_nickname">;

export type MyPostsWithUserInfo = MyPosts & {
  user_info: UserInfo;
};

export interface MyBookmark {
  bookmark_id: string;
  user_id: string;
  post_id: string;
  type: string | null;
  posts: {
    like: number | null;
    comment: number | null;
    post_id: string;
    user_id: string;
    post_img: string[];
    created_at: string;
    post_title: string;
    updated_at: string;
    post_content: string;
    post_category: string | null;
  };
  user_info: {
    params: {
      firstTag: boolean;
    };
    user_id: string;
    created_at: string;
    updated_at: string;
    user_email: string;
    user_point: number;
    user_avatar: string;
    user_nickname: string;
  };
  writername: string;
}
