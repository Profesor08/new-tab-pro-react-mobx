export class RemovedBookmarks {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  get(): Promise<BookmarkTreeNode[]> {
    return new Promise(resolve => {
      const removedBookmarksJson = localStorage.getItem(this.storageKey);

      if (removedBookmarksJson) {
        resolve(JSON.parse(removedBookmarksJson));
      } else {
        resolve([]);
      }
    });
  }

  update(bookmarks: BookmarkTreeNode[]) {
    return new Promise(resolve => {
      localStorage.setItem(this.storageKey, JSON.stringify(bookmarks));
      resolve();
    });
  }

  async push(bookmark: BookmarkTreeNode) {
    const bookmarks = await this.get();
    bookmarks.push(bookmark);
    this.update(bookmarks);
  }

  async pop() {
    const bookmarks = await this.get();
    const bookmark = bookmarks.pop();
    this.update(bookmarks);
    return bookmark;
  }
}
