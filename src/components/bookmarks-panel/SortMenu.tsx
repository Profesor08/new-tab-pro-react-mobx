import React, { useCallback } from "react";
import styled from "styled-components/macro";
import {
  ActionMenu,
  ActionButton,
  ActionDivider,
} from "../action-menu/ActionMenu";
import { IconButton } from "../buttons/IconButton";
import { Sort, useSortOrderStore } from "../../store/bookmarks/store";
import { Tooltip } from "../tooltip/Tooltip";

const Menu = styled<Styled<{ setOpen?: (open: boolean) => void }>>(
  ({ setOpen }) => {
    const sortType = useSortOrderStore((state) => state.type);
    const sortDirection = useSortOrderStore((state) => state.direction);
    const setSortType = useSortOrderStore((state) => state.setSortType);
    const setSortDirection = useSortOrderStore(
      (state) => state.setSortDirection,
    );

    const isActive = useCallback(
      (type: SortType, direction: SortDirection): boolean => {
        return sortType === type && sortDirection === direction;
      },
      [sortDirection, sortType],
    );

    const close = useCallback(() => {
      setOpen?.(false);
    }, [setOpen]);

    const onSortByDateAscending = useCallback(() => {
      setSortType(Sort.ORDER_BY_DATE);
      setSortDirection(Sort.ORDER_DIRECTION_ASCENDING);
      close();
    }, [close, setSortDirection, setSortType]);

    const onSortByDateDescending = useCallback(() => {
      setSortType(Sort.ORDER_BY_DATE);
      setSortDirection(Sort.ORDER_DIRECTION_DESCENDING);
      close();
    }, [close, setSortDirection, setSortType]);

    const onSortByNameAscending = useCallback(() => {
      setSortType(Sort.ORDER_BY_NAME);
      setSortDirection(Sort.ORDER_DIRECTION_ASCENDING);
      close();
    }, [close, setSortDirection, setSortType]);

    const onSortByNameDescending = useCallback(() => {
      setSortType(Sort.ORDER_BY_NAME);
      setSortDirection(Sort.ORDER_DIRECTION_DESCENDING);
      close();
    }, [close, setSortDirection, setSortType]);

    return (
      <ActionMenu>
        <ActionButton
          active={isActive(Sort.ORDER_BY_DATE, Sort.ORDER_DIRECTION_DESCENDING)}
          onClick={onSortByDateDescending}
        >
          ↑ By Date
        </ActionButton>
        <ActionButton
          active={isActive(Sort.ORDER_BY_DATE, Sort.ORDER_DIRECTION_ASCENDING)}
          onClick={onSortByDateAscending}
        >
          ↓ By Date
        </ActionButton>
        <ActionButton
          active={isActive(Sort.ORDER_BY_NAME, Sort.ORDER_DIRECTION_DESCENDING)}
          onClick={onSortByNameDescending}
        >
          ↑ By Name
        </ActionButton>
        <ActionButton
          active={isActive(Sort.ORDER_BY_NAME, Sort.ORDER_DIRECTION_ASCENDING)}
          onClick={onSortByNameAscending}
        >
          ↓ By Name
        </ActionButton>
        <ActionDivider />
        <ActionButton onClick={close}>&nbsp;&nbsp;&nbsp;Close</ActionButton>
      </ActionMenu>
    );
  },
)``;

export const SortMenu = () => {
  return (
    <Tooltip
      behavior="click"
      toggle={({ reference, referenceProps, ...props }) => (
        <IconButton ref={reference} {...referenceProps} {...props}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
          </svg>
        </IconButton>
      )}
      content={({ setOpen }) => <Menu setOpen={setOpen} />}
    />
  );
};
