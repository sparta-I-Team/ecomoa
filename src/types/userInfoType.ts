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

export interface LikePosts {
  like_id: string;
  user_id: string;
  post_id: string;
  status: boolean;
  liked_at: string;
  updated_at: string;
  posts: {
    like: number;
    comment: number | null;
    post_id: string;
    user_id: string;
    post_img: string[];
    created_at: string;
    post_title: string;
    updated_at: string;
    post_content: string;
    post_category: string | null;
    // Post 타입과 일치하도록 누락된 속성 추가
    location?: string;
    price?: number;
    params?: {
      firstTag: boolean;
      type?: "free" | "anabada";
    };
    user_info?: UserInfo;
  };
  writername: string;
}

export interface TypeProps {
  type: "free" | "anabada";
}

export type UserNicknameOnly = Pick<UserInfo, "user_nickname">;
