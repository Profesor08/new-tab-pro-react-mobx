interface BookmarkTreeNode extends chrome.bookmarks.BookmarkTreeNode {
  dateAdded: number;
}

interface BookmarkMenuPosition {
  containerHeight: number;
  containerTop: number;
  x: number;
  y: number;
}

type MenuState = {
  isActive: boolean;
};

type BookmarkMenuState = BookmarkMenuPosition & MenuState;

type SortType = "ORDER_BY_DATE" | "ORDER_BY_NAME";

type SortDirection = "ORDER_DIRECTION_ASCENDING" | "ORDER_DIRECTION_DESCENDING";

type SortOrder = {
  type: SortType;
  direction: SortDirection;
};
