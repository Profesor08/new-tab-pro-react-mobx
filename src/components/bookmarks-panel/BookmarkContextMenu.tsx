import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";
import {
  removeBookmark,
  useEditingBookmarkStore,
} from "../../store/bookmarks/store";
import {
  ActionMenu,
  ActionButton,
  ActionDivider,
} from "../action-menu/ActionMenu";

const BookmarkMenu = styled(ActionMenu)`
  display: grid;
`;

export const BookmarkContextMenu: React.FC<{
  bookmark: BookmarkTreeNode;
  setOpen?: (open: boolean) => void;
}> = ({ bookmark, setOpen }) => {
  const setBookmark = useEditingBookmarkStore((state) => state.setBookmark);

  const close = useCallback(() => {
    setOpen?.(false);
  }, [setOpen]);

  const onEditClick = useCallback(() => {
    if (bookmark !== null) {
      setBookmark({ ...bookmark });
    }

    close();
  }, [bookmark, close, setBookmark]);

  const onCopyUrlClick = useCallback(async () => {
    if (bookmark !== null && navigator && navigator.clipboard) {
      if (bookmark.url) {
        await navigator.clipboard.writeText(bookmark.url);
      }
    }

    close();
  }, [bookmark, close]);

  const onDeleteClick = useCallback(async () => {
    if (bookmark !== null) {
      await removeBookmark(bookmark);
    }

    close();
  }, [bookmark, close]);

  const onOpenInNewTabClick = useCallback(async () => {
    if (bookmark !== null && chrome.tabs) {
      chrome.tabs.create({ url: bookmark.url });
    }

    close();
  }, [bookmark, close]);

  const onOpenInNewWindowClick = useCallback(async () => {
    if (bookmark !== null && chrome.windows) {
      chrome.windows.create({ url: bookmark.url });
    }

    close();
  }, [bookmark, close]);

  const onOpenInIncognitoClick = useCallback(async () => {
    if (bookmark !== null && chrome.windows) {
      chrome.windows.create({
        url: bookmark.url,
        incognito: true,
      });
    }

    close();
  }, [bookmark, close]);

  const onCloseClick = useCallback(async () => {
    close();
    setBookmark(null);
  }, [close, setBookmark]);

  return (
    <BookmarkMenu>
      <ActionButton onClick={onEditClick}>Edit Bookmark</ActionButton>
      <ActionButton onClick={onCopyUrlClick}>Copy Bookmark URL</ActionButton>
      <ActionButton onClick={onDeleteClick}>Delete Bookmark</ActionButton>
      <ActionDivider />
      <ActionButton onClick={onOpenInNewTabClick}>Open in New Tab</ActionButton>
      <ActionButton onClick={onOpenInNewWindowClick}>
        Open in New Window
      </ActionButton>
      <ActionButton onClick={onOpenInIncognitoClick}>
        Open in Incognito
      </ActionButton>
      <ActionDivider />
      <ActionButton onClick={onCloseClick}>Close</ActionButton>
    </BookmarkMenu>
  );
};
