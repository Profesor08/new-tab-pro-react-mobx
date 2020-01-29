import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  ActionMenu,
  ActionButton,
  ActionDivider,
} from "../action-menu/ActionMenu";
import { IconButton } from "../buttons/IconButton";
import bookmarksStore, { Sort } from "../../store/bookmarks/store";

interface ISortMenuElementProps {
  active?: boolean;
}

const SortMenuElement = styled.div.attrs({
  tabIndex: -1,
})<ISortMenuElementProps>`
  position: relative;
  z-index: 2;
  margin-left: 10px;

  ${ActionMenu} {
    position: absolute;
    top: 100%;
    left: -99999px;
    opacity: 0;
    transform: translate(-50%, 20px);
    transition: ease transform 0.3s, opacity ease 0.3s, ease left 0s;
    transition-delay: 0s, 0s, 0.3s;
  }

  ${props =>
    props.active
      ? css`
          ${ActionMenu} {
            left: 50%;
            opacity: 1;
            transform: translate(-50%, 10px);
            transition-delay: 0s, 0s, 0s;
          }
        `
      : null}
`;

const isActive = (type: SortType, direction: SortDirection): boolean => {
  return (
    bookmarksStore.sortOrder.type === type &&
    bookmarksStore.sortOrder.direction === direction
  );
};

export const SortMenu = () => {
  const [active, setActive] = useState(false);

  return (
    <SortMenuElement
      active={active}
      onFocus={() => {
        setActive(true);
      }}
      onBlur={() => {
        setActive(false);
      }}
    >
      <IconButton>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
        </svg>
      </IconButton>
      <ActionMenu>
        <ActionButton
          active={isActive(Sort.ORDER_BY_DATE, Sort.ORDER_DIRECTION_DESCENDING)}
          onClick={() => {
            bookmarksStore.sortOrder = {
              type: Sort.ORDER_BY_DATE,
              direction: Sort.ORDER_DIRECTION_DESCENDING,
            };
            setActive(false);
          }}
        >
          ↑ By Date
        </ActionButton>
        <ActionButton
          active={isActive(Sort.ORDER_BY_DATE, Sort.ORDER_DIRECTION_ASCENDING)}
          onClick={() => {
            bookmarksStore.sortOrder = {
              type: Sort.ORDER_BY_DATE,
              direction: Sort.ORDER_DIRECTION_ASCENDING,
            };
            setActive(false);
          }}
        >
          ↓ By Date
        </ActionButton>
        <ActionButton
          active={isActive(Sort.ORDER_BY_NAME, Sort.ORDER_DIRECTION_DESCENDING)}
          onClick={() => {
            bookmarksStore.sortOrder = {
              type: Sort.ORDER_BY_NAME,
              direction: Sort.ORDER_DIRECTION_DESCENDING,
            };
            setActive(false);
          }}
        >
          ↑ By Name
        </ActionButton>
        <ActionButton
          active={isActive(Sort.ORDER_BY_NAME, Sort.ORDER_DIRECTION_ASCENDING)}
          onClick={() => {
            bookmarksStore.sortOrder = {
              type: Sort.ORDER_BY_NAME,
              direction: Sort.ORDER_DIRECTION_ASCENDING,
            };
            setActive(false);
          }}
        >
          ↓ By Name
        </ActionButton>
        <ActionDivider />
        <ActionButton
          onClick={() => {
            setActive(false);
          }}
        >
          &nbsp;&nbsp;&nbsp;Close
        </ActionButton>
      </ActionMenu>
    </SortMenuElement>
  );
};
