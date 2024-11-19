import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeApi } from "@/api/likeApi";
import { userStore } from "@/zustand/userStore";

export const useLike = (postId: string) => {
  const queryClient = useQueryClient();
  const { user } = userStore();

  // 게시물에 대한 좋아요 상태 가져오기
  const { data: isLiked = false } = useQuery<boolean>({
    queryKey: ["likes", user.id, postId],
    queryFn: async () => {
      const data = await likeApi.getLikeStatus(user.id, postId);
      return data?.status || false; // 좋아요 상태가 없으면 false로 설정
    }
  });

  // 게시물에 대한 좋아요 개수 가져오기
  const { data: likeCount = 0 } = useQuery<number>({
    queryKey: ["likeCount", postId],
    queryFn: () => likeApi.getLikeCount(postId), // API 호출하여 좋아요 개수 가져오기
    enabled: Boolean(postId) // postId가 있을 때만 쿼리 실행
  });

  // 좋아요 상태 토글 및 업데이트
  const likeMutation = useMutation<void, Error, void>({
    mutationFn: () => likeApi.toggleLike(user.id, postId, isLiked), // 좋아요 상태 변경
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes", user.id, postId] // 좋아요 상태 무효화
      });
      queryClient.invalidateQueries({
        queryKey: ["likeCount", postId] // 좋아요 개수 무효화
      });
    }
  });

  return {
    isLiked, // 현재 좋아요 상태
    likeCount, // 좋아요 개수
    handleToggleLike: () => likeMutation.mutate() // 좋아요 상태 토글 함수
  };
};
