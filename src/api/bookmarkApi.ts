import { Bookmark } from "@/types/bookmark";
import { BookmarkCount, Store } from "@/types/map";
import { createClient } from "@/utlis/supabase/client";

const supabase = createClient();

export const bookmarkApi = {
  getBookmarkStatus: async (
    userId: string,
    storeId: string
  ): Promise<Bookmark | null> => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select()
      .eq("user_id", userId)
      .eq("store_id", storeId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  toggleBookmark: async (
    userId: string,
    storeId: string,
    currentStatus: boolean
  ): Promise<void> => {
    const { data: existingBookmark, error: fetchError } = await supabase
      .from("bookmarks")
      .select()
      .eq("user_id", userId)
      .eq("store_id", storeId)
      .maybeSingle();

    if (fetchError) {
      throw fetchError;
    }

    if (existingBookmark) {
      const { error: updateError } = await supabase
        .from("bookmarks")
        .update({
          status: !currentStatus,
          updated_at: new Date(),
          type: "store"
        })
        .eq("user_id", userId)
        .eq("store_id", storeId);

      if (updateError) {
        throw updateError;
      }
    } else {
      const { error: insertError } = await supabase.from("bookmarks").insert({
        user_id: userId,
        store_id: storeId,
        status: true,
        updated_at: new Date().toISOString(),
        type: "store"
      });

      if (insertError) {
        throw insertError;
      }
    }
  },
  getSavedStores: async (userId: string): Promise<Store[]> => {
    const { data: bookmarkData, error: bookmarkError } = await supabase
      .from("bookmarks")
      .select("store_id")
      .eq("user_id", userId)
      .eq("status", true)
      .eq("type", "store");

    if (bookmarkError) throw bookmarkError;
    if (!bookmarkData) return [];

    const storeIds = bookmarkData.map((bookmark) => bookmark.store_id);

    if (storeIds.length === 0) return [];

    const { data: storeData, error: storeError } = await supabase
      .from("eco_stores")
      .select("*")
      .in("store_id", storeIds);

    if (storeError) throw storeError;

    return storeData || [];
  },

  getStoreBookmarkCounts: async (): Promise<BookmarkCount[]> => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("store_id")
      .eq("status", true)
      .eq("type", "store");

    if (error) throw error;
    if (!data) return [];

    const counts = data.reduce<Record<string, number>>((acc, item) => {
      acc[item.store_id] = (acc[item.store_id] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([store_id, count]) => ({
      store_id,
      count
    }));
  }
};
