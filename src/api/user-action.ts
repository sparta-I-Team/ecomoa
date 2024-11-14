"use server";

import {
  Bookmarks,
  LikePosts,
  UserInfo,
  UserInfoNickname
} from "@/types/userInfoType";
import { createClient } from "@/utlis/supabase/server";

export const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_info")
    .select()
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

// 닉네임 업데이트
export const updateNickname = async ({
  userId,
  newNickname
}: {
  userId: string;
  newNickname: string;
}): Promise<UserInfoNickname | null> => {
  const supabase = createClient();

  // userInfo 가져오기
  const { data: userInfo, error: fetchError } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (fetchError) {
    console.error("유저 정보 조회 오류", fetchError);
    return null;
  }

  const { error } = await supabase
    .from("user_info")
    .update({
      user_nickname: newNickname,
      params: { ...userInfo.params, firstTag: true }
    })
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("닉네임 업데이트 오류", error);
    return null;
  }
  const { error: userMetadataError } = await supabase.auth.updateUser({
    data: {
      nickname: newNickname
    }
  });
  if (userMetadataError) {
    console.error("닉네임 메타데이터 업데이트 오류", error);
  }
  return { user_nickname: newNickname };
};

// 내가 쓴 게시판 글 가져오기
export const getMyPosts = async (
  userId: string,
  type?: string,
  sortOrder: "asc" | "desc" = "desc"
) => {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, user_info(*)")
    .eq("user_id", userId)
    .eq("params->>type", type)
    .order("created_at", { ascending: sortOrder === "asc" });

  if (error) {
    console.error("내가 쓴 자유게시판 가져오기 오류", error);
    return null;
  }
  return posts || [];
};

// 닉네임 중복 검사
export const checkNicknameAvailability = async (
  newNickname: string,
  userId: string
) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_info")
    .select("user_nickname")
    .eq("user_nickname", newNickname)
    .neq("user_id", userId) // 현재 사용자의 아이디를 제외
    .limit(1);

  if (error) {
    console.error("닉네임 중복 검사 오류", error);
    return null;
  }
  return data.length === 0; // 사용 가능하면 true, 중복이면 false
};

// 이메일 중복 검사
export const checkEmailAbility = async (userEmail: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_info")
    .select("user_email")
    .eq("user_email", userEmail)
    .neq("params->>is_deleted", "true") // 탈퇴한 경우 중복 검사 안 걸리게
    .limit(1);

  if (error) {
    console.error("이메일 중복 검사 오류", error);
    return null;
  }
  return data.length === 0; // 사용 가능하면 true, 중복이면 false
};

// 좋아요 게시글 가져오기
export const getLikePosts = async (
  userId: string,
  type?: string,
  sortOrder: "asc" | "desc" = "desc"
): Promise<LikePosts[] | []> => {
  const supabase = createClient();
  const { data: likes, error: likeError } = await supabase
    .from("likes")
    .select("*, posts(*)")
    .eq("status", true)
    .eq("user_id", userId)
    .order("liked_at", { ascending: sortOrder === "asc" });
  // .eq("params->>type", type);

  if (likeError) {
    console.error("likes 테이블 정보 가져오기 오류", likeError);
    return [];
  }

  // 좋아요한 포스트 id 배열
  // const postIds = likes.map((like) => like.post_id);

  // 포스트 테이블에서 관련 정보 가져오기(정렬 추가)
  // const { data: posts, error: postsError } = await supabase
  //   .from("posts")
  //   .select("*")
  //   .in("post_id", postIds)
  //   .eq("params->>type", type)
  //   .order("created_at", { ascending: sortOrder === "asc" });
  // if (postsError) {
  //   console.error("posts 테이블 정보 가져오기 오류", postsError);
  //   return [];
  // }

  const likePosts = await Promise.all(
    likes?.map(async (like) => {
      // const post = posts.find((p) => p.post_id === like.post_id);
      const { data } = await supabase
        .from("user_info")
        .select("user_nickname")
        .eq("user_id", like?.posts.user_id)
        .single();

      return {
        ...like,
        // posts: post || {},
        writername: data?.user_nickname
      } as LikePosts;
    }) || []
  );

  return likePosts;
};

//  게시판에서 스크랩한 게시글 가져오기
export const getBookmarkPosts = async (userId: string) => {
  const supabase = createClient();
  const { data: scraps, error } = await supabase
    .from("bookmarks")
    .select(
      `*,  posts (
        post_id,
        post_title,
        user_id,
        post_img,
        created_at,
        updated_at,
        post_content
      ),
      user_info (
        user_id,
        user_nickname,
        user_avatar
      )`
    )
    .eq("user_id", userId);

  const updateScraps = await Promise.all(
    scraps?.map(async (item) => {
      const { data } = await supabase
        .from("user_info")
        .select("user_nickname")
        .eq("user_id", item?.posts.user_id)
        .single();

      return {
        ...item,
        writername: data?.user_nickname
      };
    }) || []
  );

  if (error) {
    console.error("북마크 post 가져오기 오류", error);
    return null;
  }
  return updateScraps;
};

// 아나바다 게시판에서 스크랩한 글 가져오기
export const getBookmarkAnabada = async (userId: string) => {
  const supabase = createClient();
  const { data: anabada, error } = await supabase
    .from("anabada")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("아나바다 북마크 post 가져오기 오류", error);
    return null;
  }
  return anabada;
};

// 북마크
export const getBookmarks = async (
  userId: string
): Promise<Bookmarks[] | null> => {
  const supabase = createClient();
  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*, posts(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("북마크 포스트 가져오기 오류", error);
    return null;
  }
  return bookmarks;
};
