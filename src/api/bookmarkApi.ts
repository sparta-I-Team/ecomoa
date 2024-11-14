import { Bookmark } from "@/types/bookmark";
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
  }
};
