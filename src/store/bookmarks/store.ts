import { observable, computed } from "mobx";
import { Sort, bookmarksFilter, saveToStorage } from "./utils";
import { Bookmarks } from "./Bookmarks";

export { Sort };

class BookmarksStore {
  @observable private _bookmarks: BookmarkTreeNode[] = [];
  @observable private _sortOrder: SortOrder = {
    type: "ORDER_BY_DATE",
    direction: "ORDER_DIRECTION_DESCENDING",
  };
  @observable public bookmarksPanelShow: boolean = false;
  @observable public searchQuery: string = "";
  @observable public editingBookmark: BookmarkTreeNode | null = null;

  private bookmarksWorker = new Bookmarks(bookmarks => {
    this._bookmarks = bookmarks;
  });

  @computed get bookmarks(): BookmarkTreeNode[] {
    return bookmarksFilter(
      this._bookmarks,
      this.searchQuery,
      this._sortOrder.type,
      this._sortOrder.direction,
    );
  }

  set bookmarks(bookmarks: BookmarkTreeNode[]) {
    this._bookmarks = bookmarks;
  }

  @computed get sortOrder() {
    return this._sortOrder;
  }

  set sortOrder(sortOrder) {
    this._sortOrder = sortOrder;
    saveToStorage("bookmarksSortOrder", sortOrder);
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
