import { observable, computed, makeAutoObservable } from "mobx";
import { Sort, bookmarksFilter, saveToStorage } from "./utils";
import { Bookmarks } from "./Bookmarks";

export { Sort };

class BookmarksStore {
  private _bookmarks: BookmarkTreeNode[] = [];
  private _sortOrder: SortOrder = {
    type: "ORDER_BY_DATE",
    direction: "ORDER_DIRECTION_DESCENDING",
  };
  public bookmarksPanelShow: boolean = false;
  private _searchQuery: string = "";
  public editingBookmark: BookmarkTreeNode | null = null;

  private bookmarksWorker = new Bookmarks((bookmarks) => {
    this._bookmarks = bookmarks;
  });

  constructor() {
    makeAutoObservable(this);
  }

  get bookmarks(): BookmarkTreeNode[] {
    return bookmarksFilter(
      this._bookmarks,
      this._searchQuery,
      this._sortOrder.type,
      this._sortOrder.direction,
    );
  }

  set bookmarks(bookmarks: BookmarkTreeNode[]) {
    this._bookmarks = bookmarks;
  }

  get sortOrder() {
    return this._sortOrder;
  }

  set sortOrder(sortOrder) {
    this._sortOrder = sortOrder;
    saveToStorage("bookmarksSortOrder", sortOrder);
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(value) {
    this._searchQuery = value;
  }

  async removeBookmark(bookmark: BookmarkTreeNode) {
    await this.bookmarksWorker.remove(bookmark);
  }

  async restoreBookmark() {
    await this.bookmarksWorker.restore();
  }

  async updateBookmark(
    id: string,
    changes: chrome.bookmarks.BookmarkChangesArg,
  ) {
    await this.bookmarksWorker.update(id, changes);
  }
}

export default new BookmarksStore();
