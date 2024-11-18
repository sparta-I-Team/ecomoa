import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookmarkApi } from "@/api/bookmarkApi";
import { userStore } from "@/zustand/userStore";
import { BookmarkCount, Store } from "@/types/map";

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

      queryClient.invalidateQueries({
        queryKey: ["storeBookmarkCounts"]
      });

      queryClient.setQueryData<BookmarkCount[]>(
        ["storeBookmarkCounts"],
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.map((count) => {
            if (count.store_id === storeId) {
              return {
                ...count,
                count: count.count + (isBookmarked ? -1 : 1)
              };
            }
            return count;
          });
        }
      );
    }
  });

  return {
    isBookmarked,
    handleToggleBookmark: async () => {
      bookmarkMutation.mutate();
    }
  };
};

// 저장된 가게 목록 훅에 refetch 함수 추가
export const useSavedStores = () => {
  const { user } = userStore();

  const { data: savedStores = [], refetch } = useQuery<Store[]>({
    queryKey: ["savedStores", user.id],
    queryFn: () => bookmarkApi.getSavedStores(user.id),
    enabled: !!user.id
  });

  return { savedStores, refetchSavedStores: refetch };
};

export const useStoreBookmarkCounts = () => {
  const { data: bookmarkCounts = [], refetch } = useQuery<BookmarkCount[]>({
    queryKey: ["storeBookmarkCounts"],
    queryFn: () => bookmarkApi.getStoreBookmarkCounts(),
    staleTime: 1000 * 60,
  });

  return {
    bookmarkCounts,
    refetchBookmarkCounts: refetch
  };
};
