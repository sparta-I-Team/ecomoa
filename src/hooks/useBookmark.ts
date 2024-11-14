import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookmarkApi } from "@/api/bookmarkApi";
import { userStore } from "@/zustand/userStore";

export const useBookmark = (storeId: string) => {
  const queryClient = useQueryClient();
  const { user } = userStore();

  const { data: isBookmarked = false } = useQuery<boolean>({
    queryKey: ["bookmarks", user.id, storeId],
    queryFn: async () => {
      const data = await bookmarkApi.getBookmarkStatus(user.id, storeId);
      return data?.status || false;
    }
  });

  const bookmarkMutation = useMutation<void, Error, void>({
    mutationFn: () =>
      bookmarkApi.toggleBookmark(user.id, storeId, isBookmarked),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", user.id, storeId]
      });
      queryClient.invalidateQueries({
        queryKey: ["savedStores", user.id]
      });
    }
  });

  return {
    isBookmarked,
    handleToggleBookmark: () => {
      bookmarkMutation.mutate();
    }
  };
};
