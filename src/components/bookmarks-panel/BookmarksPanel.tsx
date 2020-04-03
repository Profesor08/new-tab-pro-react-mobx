import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { observer } from "mobx-react";
import bookmarksStore from "../../store/bookmarks/store";
import { Panel, PanelHeader, PanelBody, PanelContainer } from "../panel/Panel";
import { SearchInput } from "../search/Search";
import { SortMenu } from "./SortMenu";
import { IconButton } from "../buttons/IconButton";
import { BookmarkItem } from "./BookmarkItem";
import { BookmarkContextMenu, useBookmarkMenu } from "./BookmarkContextMenu";
import { BookmarkEditor } from "./BookmarkEditor";

const BookmarksPanelElement = styled(Panel)``;

const BookmarksSearch = styled(SearchInput)`
  width: 70%;
`;

const RestoreButton = styled(IconButton)`
  margin-left: 10px;
`;

const { open, update } = useBookmarkMenu();

const BookmarksList = observer(() => {
  const [active, setActive] = useState(false);
  const [items, setItems] = useState<JSX.Element[]>([]);
  const bookmarks = bookmarksStore.bookmarks;

  useEffect(() => {
    if (bookmarksStore.bookmarksPanelShow === true) {
      setActive(true);
    }
  }, [bookmarksStore.bookmarksPanelShow]);

  useEffect(() => {
    if (active) {
      setItems(
        bookmarks.map((bookmark, id) => (
          <BookmarkItem
            key={`bookmark-item-${id}`}
            bookmark={bookmark}
            onMenu={open}
          />
        )),
      );
    }
  }, [active, bookmarks]);

  if (active) {
    return <React.Fragment>{items}</React.Fragment>;
  }

  return null;
});

export const BookmarksPanel = observer(() => {
  const panelContainerRef = useRef(null);

  const onClose = () => {
    bookmarksStore.bookmarksPanelShow = false;
  };

  return (
    <BookmarksPanelElement
      active={bookmarksStore.bookmarksPanelShow}
      onClose={onClose}
    >
      <PanelHeader onClose={onClose}>
        <BookmarksSearch
          value={bookmarksStore.searchQuery}
          placeholder="Поиск"
          onChange={(value) => {
            bookmarksStore.searchQuery = value;
          }}
        />
        <SortMenu />
        <RestoreButton
          onClick={() => {
            bookmarksStore.restoreBookmark();
          }}
        >
          ↶
        </RestoreButton>
      </PanelHeader>
      <PanelBody>
        <PanelContainer
          ref={panelContainerRef}
          onScroll={() => {
            update();
          }}
        >
          <BookmarkContextMenu parent={panelContainerRef} />
          <BookmarksList />
        </PanelContainer>
      </PanelBody>
      <BookmarkEditor />
    </BookmarksPanelElement>
  );
});
