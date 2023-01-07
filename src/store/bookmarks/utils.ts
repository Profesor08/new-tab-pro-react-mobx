export class Sort {
  public static ORDER_BY_DATE: SortType = "ORDER_BY_DATE";
  public static ORDER_BY_NAME: SortType = "ORDER_BY_NAME";
  public static ORDER_DIRECTION_ASCENDING: SortDirection =
    "ORDER_DIRECTION_ASCENDING";
  public static ORDER_DIRECTION_DESCENDING: SortDirection =
    "ORDER_DIRECTION_DESCENDING";
}

export const isStorageAvailable = () => {
  return chrome !== undefined && chrome.bookmarks !== undefined;
};

export const bookmarksFilter = (
  bookmarks: BookmarkTreeNode[],
  searchQuery: string,
  sortType: SortType,
  sortDirection: SortDirection,
): BookmarkTreeNode[] => {
  return bookmarks
    .filter((bookmark) => {
      const titleMatch =
        bookmark.title.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
      const urlMatch = bookmark.url
        ? bookmark.url.toLowerCase().search(searchQuery.toLowerCase()) !== -1
        : false;

      return titleMatch || urlMatch;
    })
    .sort((a: BookmarkTreeNode, b: BookmarkTreeNode): -1 | 0 | 1 => {
      function sortOrder(
        a: string | number,
        b: string | number,
        order: SortDirection,
      ): -1 | 0 | 1 {
        switch (order) {
          case Sort.ORDER_DIRECTION_ASCENDING: {
            if (a > b) {
              return 1;
            }
            if (a < b) {
              return -1;
            }

            break;
          }

          case Sort.ORDER_DIRECTION_DESCENDING: {
            if (a < b) {
              return 1;
            }
            if (a > b) {
              return -1;
            }

            break;
          }
        }

        return 0;
      }

      switch (sortType) {
        case Sort.ORDER_BY_NAME: {
          return sortOrder(a.title, b.title, sortDirection);
        }

        case Sort.ORDER_BY_DATE: {
          return sortOrder(a.dateAdded, b.dateAdded, sortDirection);
        }
      }

      return 0;
    });
};
