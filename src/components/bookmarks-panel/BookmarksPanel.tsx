import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/macro";
import { observer, Observer } from "mobx-react";
import bookmarksStore from "../../store/bookmarks/store";
import { Panel, PanelHeader, PanelBody, PanelContainer } from "../panel/Panel";
import { SearchInput } from "../search/Search";
import { SortMenu } from "./SortMenu";
import { IconButton } from "../buttons/IconButton";
import { BookmarkItem } from "./BookmarkItem";
import { BookmarkContextMenu, createBookmarkMenu } from "./BookmarkContextMenu";
import { BookmarkEditor } from "./BookmarkEditor";
import { runInAction } from "mobx";

const BookmarksPanelElement = styled(Panel)``;

const BookmarksSearch = styled(SearchInput)`
  width: 70%;
`;

const RestoreButton = styled(IconButton)`
  margin-left: 10px;
`;

const { open, update } = createBookmarkMenu();

const BookmarksList = () => {
  return (
    <Observer>
      {() => {
        if (bookmarksStore.bookmarksPanelShow === true) {
          return (
            <>
              {bookmarksStore.bookmarks.map((bookmark, id) => (
                <BookmarkItem
                  key={`bookmark-item-${id}`}
                  bookmark={bookmark}
                  onMenu={open}
                />
              ))}
            </>
          );
        }

        return null;
      }}
    </Observer>
  );
};

export const BookmarksPanel = () => {
  const panelContainerRef = useRef(null);

  const onClose = () => {
    runInAction(() => {
      bookmarksStore.bookmarksPanelShow = false;
    });
  };

  return (
    <Observer>
      {() => {
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
      }}
    </Observer>
  );
};
