import styled from "styled-components";

export const IconButton = styled.button`
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  line-height: 100%;
  position: relative;
  background-color: transparent;
  border: 0;
  outline: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    &:before {
      transform: translate(-50%, -50%) scale(1) translateZ(0);
    }
  }

  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.11);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0) translateZ(0);
    transition: ease transform 0.15s;
    will-change: tranform;
  }

  svg,
  img {
    width: 24px;
    height: 24px;
  }
`;
