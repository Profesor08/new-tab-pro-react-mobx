import styled, { css } from "styled-components/macro";

interface IActionButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const ActionButton = styled.div<IActionButtonProps>`
  display: grid;
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
  background-color: transparent;
  outline: none;
  transition: ease background-color 0.1s;

  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }

  ${(props) =>
    props.active
      ? css`
          background-color: #e0ebfd;
        `
      : null}

  ${(props) =>
    props.disabled
      ? css`
          color: darken(#e0e0e0, 10%);
          pointer-events: none;
        `
      : null}
`;

export const ActionDivider = styled.div`
  background-color: rgba(0, 0, 0, 0.11);
  border-width: 0;
  height: 1px;
  margin: 8px 0;
`;

export const ActionMenu = styled.div`
  display: grid;
  white-space: nowrap;
  box-shadow: 0 2px 6px #9e9e9e;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 8px 0;
  transition: box-shadow 250ms;
`;
