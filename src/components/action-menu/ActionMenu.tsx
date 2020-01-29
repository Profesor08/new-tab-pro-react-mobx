import React from "react";
import styled, { css } from "styled-components";

interface IActionButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const ActionButton = styled.div<IActionButtonProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 24px;
  font-family: Roboto, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 100%;
  text-align: left;
  border: 0;
  background: transparent;
  outline: none;
  transition: ease background-color 0.1s;

  &:hover {
    background: #e0e0e0;
    cursor: pointer;
  }

  ${props =>
    props.active
      ? css`
          background: #e0ebfd;
        `
      : null}

  ${props =>
    props.disabled
      ? css`
          color: darken(#e0e0e0, 10%);
          pointer-events: none;
        `
      : null}
`;

export const ActionDivider = styled.div`
  background: rgba(0, 0, 0, 0.11);
  border-width: 0;
  height: 1px;
  margin: 8px 0;
`;

export const ActionMenu = styled.div`
  white-space: nowrap;
  box-shadow: 0 2px 6px #9e9e9e;
  background: #f4f4f4;
  border-radius: 2px;
  padding: 8px 0;
  transition: box-shadow 250ms;
`;
