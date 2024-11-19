import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeApi } from "@/api/likeApi";
import { userStore } from "@/zustand/userStore";
import { Like } from "@/types/like";

export const useLike = (postId: string) => {
  const queryClient = useQueryClient();
  const { user } = userStore(); // 현재 사용자 정보 가져오기

  // console.log("여기는 유즈라이크 =>", postId);
  // 해당 게시물에 대한 좋아요 상태를 가져오는 query
  const { data: isLiked = false } = useQuery<boolean>({
    queryKey: ["likes", user.id, postId], // 사용자 아이디와 게시물 ID를 조합한 queryKey
    queryFn: async () => {
      const data = await likeApi.getLikeStatus(user.id, postId);
      return data?.status || false; // 좋아요 상태를 반환 (없으면 false)
    }
  });

  const { data: likes = [] } = useQuery<Like[]>({
    queryKey: ["likes", postId],
    queryFn: async () => {
      return await likeApi.getLikeCount(postId);
    }
  });

  // 좋아요 토글 mutation
  const likeMutation = useMutation<void, Error, void>({
    mutationFn: () => likeApi.toggleLike(user.id, postId, isLiked),
    onSuccess: () => {
      // 좋아요 상태를 변경한 후 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["likes", user.id, postId] });
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    }
  });

  return {
    likes,
    isLiked, // 좋아요 상태
    handleToggleLike: () => likeMutation.mutate() // 좋아요 토글 함수
  };
};
