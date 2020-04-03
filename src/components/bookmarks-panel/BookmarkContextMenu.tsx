import React, { useRef, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { observer } from "mobx-react";
import { observable } from "mobx";
import bookmarksStore from "../../store/bookmarks/store";
import {
  ActionMenu,
  ActionButton,
  ActionDivider,
} from "../action-menu/ActionMenu";

interface IBookmarkMenuStore {
  x: number;
  y: number;
  active: boolean;
  bookmark: null | BookmarkTreeNode;
  target: EventTarget | null;
  needsUpdate: boolean;
}

const store: IBookmarkMenuStore = observable({
  x: 0,
  y: 0,
  active: false,
  bookmark: null,
  target: null,
  needsUpdate: false,
});

interface IBookmarkMenuProps {
  active?: boolean;
  x?: number;
  y?: number;
}

const BookmarkMenu = styled(ActionMenu).attrs((props: IBookmarkMenuProps) => ({
  style: {
    transform: `translateY(${props.y || 0}px)`,
  },
  tabIndex: 0,
  focus: props.active === true,
}))<IBookmarkMenuProps>`
  position: absolute;
  right: 80px;
  z-index: 1;
  transition: ease opacity 0.3s, ease right 0s, ease top 0.3s;
  outline: none;

  ${(props) => {
    return props.active
      ? css`
          opacity: 1;
          top: 0;
          transition-delay: 0s, 0s, 0s;
        `
      : css`
          opacity: 0;
          top: 10px;
          right: -99999px;
          transition-delay: 0s, 0.3s, 0s;
        `;
  }}
`;

interface IBookmarkContextMenuProps {
  parent: React.MutableRefObject<null | HTMLDivElement>;
}

export const useBookmarkMenu = () => {
  return {
    open: (target: EventTarget, bookmark: BookmarkTreeNode) => {
      store.target = target;
      store.bookmark = bookmark;
      store.active = true;
    },
    update: () => {
      store.needsUpdate = true;
    },
  };
};

export const BookmarkContextMenu = observer(
  ({ parent }: IBookmarkContextMenuProps) => {
    const menuRef = useRef<null | HTMLDivElement>(null);

    const getMenuPosition = (): number => {
      const container: any = parent.current;
      const menu: any = menuRef.current;

      if (
        container instanceof HTMLElement &&
        menu instanceof HTMLElement &&
        store.target instanceof HTMLElement
      ) {
        let y = store.target.offsetTop - container.scrollTop;

        if (y + menu.offsetHeight > container.offsetHeight) {
          y = y - menu.offsetHeight + store.target.offsetHeight;

          if (y + menu.offsetHeight > container.offsetHeight) {
            y -= y + menu.offsetHeight - container.offsetHeight + 10;
          }
        }

        if (y < 10) {
          y = 10;
        }

        return y + container.scrollTop;
      }

      return 0;
    };

    useEffect(() => {
      store.y = getMenuPosition();
    }, [
      store.target,
      store.bookmark,
      store.active,
      menuRef.current,
      parent.current,
    ]);

    useEffect(() => {
      if (store.needsUpdate) {
        store.needsUpdate = false;
        store.y = getMenuPosition();
      }
    }, [store.needsUpdate]);

    if (menuRef.current !== null && store.active) {
      menuRef.current.focus();
    }

    return (
      <BookmarkMenu
        ref={menuRef}
        active={store.active}
        x={store.x}
        y={store.y}
        onBlur={() => {
          store.active = false;
        }}
      >
        <ActionButton
          onClick={() => {
            if (store.bookmark) {
              bookmarksStore.editingBookmark = { ...store.bookmark };
            }
            store.active = false;
          }}
        >
          Edit Bookmark
        </ActionButton>
        <ActionButton
          onClick={async () => {
            if (store.bookmark && navigator && navigator.clipboard) {
              try {
                if (store.bookmark.url) {
                  await navigator.clipboard.writeText(store.bookmark.url);
                }
              } catch (err) {
                console.warn(err);
              }
              store.active = false;
            }
          }}
        >
          Copy Bookmark URL
        </ActionButton>
        <ActionButton
          onClick={async () => {
            if (store.bookmark) {
              store.active = false;
              await bookmarksStore.removeBookmark(store.bookmark);
            }
          }}
        >
          Delete Bookmark
        </ActionButton>
        <ActionDivider />
        <ActionButton
          onClick={() => {
            if (store.bookmark && chrome.tabs) {
              chrome.tabs.create({ url: store.bookmark.url }, () => {
                store.active = false;
              });
            }
          }}
        >
          Open in New Tab
        </ActionButton>
        <ActionButton
          onClick={() => {
            if (store.bookmark && chrome.windows) {
              chrome.windows.create({ url: store.bookmark.url }, () => {
                store.active = false;
              });
            }
          }}
        >
          Open in New Window
        </ActionButton>
        <ActionButton
          onClick={() => {
            if (store.bookmark && chrome.windows) {
              chrome.windows.create(
                {
                  url: store.bookmark.url,
                  incognito: true,
                },
                () => {
                  store.active = false;
                },
              );
            }
          }}
        >
          Open in Incognito
        </ActionButton>
        <ActionDivider />
        <ActionButton
          onClick={() => {
            store.active = false;
          }}
        >
          Close
        </ActionButton>
      </BookmarkMenu>
    );
  },
);
