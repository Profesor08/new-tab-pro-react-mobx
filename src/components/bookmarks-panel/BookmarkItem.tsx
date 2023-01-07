import React from "react";
import styled from "styled-components/macro";
import { favicon } from "../../lib/favicon";
import { IconButton } from "../buttons/IconButton";
import { Tooltip } from "../tooltip/Tooltip";
import { BookmarkContextMenu } from "./BookmarkContextMenu";

function dateFormat(timestamp: number): string {
  return new Date(timestamp).toLocaleString().substr(0, 10);
}

function timeFormat(timestamp: number): string {
  const time = new Date(timestamp).toLocaleString().substr(12);

  if (time.length < 8) {
    return "0" + time;
  }

  return time;
}

const BookmarkImage = styled.img`
  background-repeat: no-repeat;
  height: 16px;
  margin: 2px;
  width: 16px;
`;

const BookmarkTitle = styled.a`
  color: rgba(32, 33, 36, 1);
  flex-basis: 0%;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 13px;
  line-height: 20px;
  margin: 0 0 0 20px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const BookmarkUrl = styled.div`
  color: rgba(0, 0, 0, 0.54);
  display: none;
  flex: 1;
  margin-inline-start: 20px;
  min-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
`;

const BookmarkTime = styled.div`
  flex-shrink: 0;
  font-size: 11.2px;
  margin: 0 15px;
  font-weight: bolder;
  text-align: center;
  white-space: nowrap;
`;

const BookmarkMenuButton = styled(IconButton)`
  margin-right: 10px;
`;

const BookmarkItemElement = styled.div`
  align-items: center;
  color: inherit;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding-inline-start: 20px;
  text-decoration: none;
  user-select: none;

  &:hover {
    background: #e0ebfd;

    ${BookmarkTitle} {
      flex: 0 auto;
    }

    ${BookmarkUrl} {
      display: block;
    }
  }
`;

interface IBookmarkItemProps {
  bookmark: BookmarkTreeNode;
}

export const BookmarkItem = ({ bookmark }: IBookmarkItemProps) => (
  <BookmarkItemElement>
    <BookmarkImage
      // src={`https://www.google.com/s2/favicons?domain=` + bookmark.url}
      src={favicon(bookmark.url ?? "")}
      width={24}
      height={24}
      loading="lazy"
    />
    <BookmarkTitle href={bookmark.url}>{bookmark.title}</BookmarkTitle>
    <BookmarkUrl>{bookmark.url}</BookmarkUrl>
    <BookmarkTime>
      {dateFormat(bookmark.dateAdded)}, {timeFormat(bookmark.dateAdded)}
    </BookmarkTime>
    <Tooltip
      behavior="click"
      toggle={({ reference, referenceProps, ...props }) => {
        return (
          <BookmarkMenuButton ref={reference} {...referenceProps} {...props}>
            ⋮
          </BookmarkMenuButton>
        );
      }}
      content={({ setOpen }) => (
        <BookmarkContextMenu bookmark={bookmark} setOpen={setOpen} />
      )}
    />
  </BookmarkItemElement>
);
