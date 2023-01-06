import { Sort, bookmarksFilter } from "./utils";
import { Bookmarks } from "./Bookmarks";
import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CommonStorageProvider } from "../../lib/storage/providers/CommonStorageProvider";

export { Sort };

const useBookmarksStore = create<{
  bookmarks: BookmarkTreeNode[];
}>(() => ({
  bookmarks: [],
}));

export const useSearchQueryStore = create<{
  query: string;
  setQuery: (query: string) => void;
}>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));

export const useSortOrderStore = create(
  persist<
    SortOrder & {
      setSortType: (type: SortType) => void;
      setSortDirection: (direction: SortDirection) => void;
    }
  >(
    (set) => ({
      type: "ORDER_BY_DATE",
      direction: "ORDER_DIRECTION_DESCENDING",
      setSortType: (type) => set({ type }),
      setSortDirection: (direction) => set({ direction }),
    }),
    {
      name: "new-tab-pro-bookmarks-sorting",
      storage: createJSONStorage(() => new CommonStorageProvider()),
    },
  ),
);

export const useEditingBookmarkStore = create<{
  bookmark: BookmarkTreeNode | null;
  setBookmark: (bookmark: BookmarkTreeNode | null) => void;
}>((set) => ({
  bookmark: null,
  setBookmark: (bookmark) => set({ bookmark }),
}));

export const useBookmarks = () => {
  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const query = useSearchQueryStore((state) => state.query);
  const { type, direction } = useSortOrderStore();

  return bookmarksFilter(bookmarks, query, type, direction);
};

const bookmarksWorker = new Bookmarks((bookmarks) => {
  useBookmarksStore.setState({ bookmarks });
});

export const removeBookmark = async (bookmark: BookmarkTreeNode) => {
  await bookmarksWorker.remove(bookmark);
};

export const restoreBookmark = async () => {
  await bookmarksWorker.restore();
};

export const updateBookmark = async (
  id: string,
  changes: chrome.bookmarks.BookmarkChangesArg,
) => {
  await bookmarksWorker.update(id, changes);
};
