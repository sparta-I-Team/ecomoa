import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likeApi } from "@/api/likeApi";
import { userStore } from "@/zustand/userStore";

export const useLike = (postId: string) => {
  const queryClient = useQueryClient();
  const { user } = userStore();

  const { data: isLiked = false } = useQuery<boolean>({
    queryKey: ["likes", user?.id, postId],
    queryFn: async () => {
      if (!user?.id) return false;
      const data = await likeApi.getLikeStatus(user.id, postId);
      return data?.status || false;
    },
    enabled: !!user?.id
  });

  const likeMutation = useMutation<void, Error, void>({
    mutationFn: () => likeApi.toggleLike(user.id, postId, isLiked),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes", user.id, postId]
      });

      queryClient.invalidateQueries({
        queryKey: ["likePosts", user.id]
      });
    }
  });

  return {
    isLiked,
    handleToggleLike: () => likeMutation.mutate()
  };
};
