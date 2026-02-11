import { create } from "zustand";
import { account } from "../lib/Functions";
import { db } from "../lib/Functions";

export const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  getTheLoginUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const session = await account.get();

      set({
        user: session ?? null,
      });

      return session;
    } catch (err) {
      set({
        user: null,
        error: err?.message ?? "Failed to fetch user",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  logOutTheUser: async () => {
    set({ isLoading: true, error: null });

    try {
      await account.deleteSessions("current");

      set({
        user: null,
      });
    } catch (err) {
      set({
        error: err?.message ?? "Failed to logout",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useBookmarkStore = create((set) => ({
  bookmarks: [],
  isLoading: false,
  error: null,
  getBookmarks: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await db.listDocuments(
        "697c9282002782873b5d",
        "bookmarks",
      );

      set({
        bookmarks: result.documents ?? [],
      });
    } catch (err) {
      set({
        error: err?.message ?? "Failed to fetch bookmarks",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
