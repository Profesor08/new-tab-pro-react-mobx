import { isStorageAvailable } from "./utils";
import { RemovedBookmarks } from "./RemovedBookmarks";

const removedBookmarks = new RemovedBookmarks("removedBookmarks");

const parseBookmarksThree = (tree: BookmarkTreeNode[]): BookmarkTreeNode[] => {
  const bookmarks: BookmarkTreeNode[] = [];

  function parse(nodeList: BookmarkTreeNode[]) {
    nodeList.forEach((node: BookmarkTreeNode) => {
      if (node.children !== undefined) {
        parse(node.children as BookmarkTreeNode[]);
      } else {
        bookmarks.push(node);
      }
    });
  }

  parse(tree);

  return bookmarks;
};

export class Bookmarks {
  updateCallback?: (bookmarks: BookmarkTreeNode[]) => void;

  constructor(updateCallback?: (bookmarks: BookmarkTreeNode[]) => void) {
    this.updateCallback = updateCallback;

    if (isStorageAvailable()) {
      chrome.bookmarks.onCreated.addListener(async () => {
        this.reload();
      });

      chrome.bookmarks.onRemoved.addListener(async () => {
        this.reload();
      });

      chrome.bookmarks.onChanged.addListener(async () => {
        this.reload();
      });
    }

    this.reload();
  }

  private async reload() {
    if (this.updateCallback) {
      this.updateCallback(await this.get());
    }
  }

  get(): Promise<BookmarkTreeNode[]> {
    return new Promise(resolve => {
      if (isStorageAvailable()) {
        chrome.bookmarks.getTree(results => {
          resolve(parseBookmarksThree(results as BookmarkTreeNode[]));
        });
      } else {
        const json = localStorage.getItem("bookmarks");

        if (typeof json === "string") {
          try {
            const bookmarks = JSON.parse(json);

            resolve(bookmarks);
          } catch {
            resolve([]);
          }
        } else {
          resolve([]);
        }
      }
    });
  }

  async remove(bookmark: BookmarkTreeNode) {
    if (isStorageAvailable()) {
      chrome.bookmarks.remove(bookmark.id);
    } else {
      localStorage.setItem(
        "bookmarks",
        JSON.stringify((await this.get()).filter(b => b.id !== bookmark.id)),
      );
    }

    removedBookmarks.push(bookmark);
  }

  async add(bookmark: BookmarkTreeNode) {
    if (isStorageAvailable()) {
      chrome.bookmarks.create({
        title: bookmark.title,
        url: bookmark.url,
      });
    } else {
      const bookmarks = await this.get();
      bookmarks.unshift(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      this.reload();
    }
  }

  async restore() {
    const bookmark = await removedBookmarks.pop();

    if (bookmark) {
      await this.add(bookmark);
    }
  }

  async update(id: string, changes: chrome.bookmarks.BookmarkChangesArg) {
    if (isStorageAvailable()) {
      chrome.bookmarks.update(id, changes);
    } else {
      localStorage.setItem(
        "bookmarks",
        JSON.stringify(
          (await this.get()).map(bookmark => {
            if (bookmark.id === id) {
              return {
                ...bookmark,
                ...changes,
              };
            }

            return bookmark;
          }),
        ),
      );
      this.reload();
    }
  }
}
