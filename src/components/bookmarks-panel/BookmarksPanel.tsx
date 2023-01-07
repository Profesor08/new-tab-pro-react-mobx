import React, { useEffect, useRef } from "react";
import styled from "styled-components/macro";
import {
  restoreBookmark,
  useBookmarks,
  useSearchQueryStore,
  useSortOrderStore,
} from "../../store/bookmarks/store";
import { Panel, PanelHeader, PanelBody, PanelContainer } from "../panel/Panel";
import { SearchInput } from "../search/Search";
import { SortMenu } from "./SortMenu";
import { IconButton } from "../buttons/IconButton";
import { BookmarkItem } from "./BookmarkItem";
import { BookmarkEditor } from "./BookmarkEditor";
import { useControls } from "../../store/options";
import ViewportList from "react-viewport-list";

const BookmarksPanelElement = styled(Panel)``;

const BookmarksSearch = styled(SearchInput)``;

const RestoreButton = styled(IconButton)``;

export const BookmarksPanel = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const showBookmarksPanel = useControls((state) => state.bookmarks);
  const closeBookmarksPanel = useControls((state) => state.closeBookmarks);

  const searchQuery = useSearchQueryStore((state) => state.query);
  const setSearchQuery = useSearchQueryStore((state) => state.setQuery);

  const sortType = useSortOrderStore((state) => state.type);
  const sortDirection = useSortOrderStore((state) => state.direction);

  const bookmarks = useBookmarks();

  useEffect(() => {
    viewportRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [searchQuery, sortType, sortDirection]);

  return (
    <BookmarksPanelElement
      active={showBookmarksPanel === true}
      onClose={closeBookmarksPanel}
    >
      <PanelHeader onClose={closeBookmarksPanel}>
        <BookmarksSearch
          value={searchQuery}
          placeholder="Поиск"
          onChange={setSearchQuery}
        />
        <SortMenu />
        <RestoreButton
          onClick={() => {
            restoreBookmark();
          }}
        >
          ↶
        </RestoreButton>
      </PanelHeader>
      <PanelBody>
        <PanelContainer ref={viewportRef}>
          {showBookmarksPanel && (
            <ViewportList
              viewportRef={viewportRef}
              items={bookmarks}
              itemMinSize={40}
              margin={0}
            >
              {(bookmark, index) => (
                <BookmarkItem
                  key={`bookmark-item-${index}`}
                  bookmark={bookmark}
                />
              )}
            </ViewportList>
          )}
        </PanelContainer>
      </PanelBody>
      <BookmarkEditor />
    </BookmarksPanelElement>
  );
};
