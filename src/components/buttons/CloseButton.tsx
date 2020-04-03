import styled from "styled-components/macro";

export const CloseButton = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  background-color: transparent;
  border: 0;
  outline: navajowhite;

  &:hover {
    cursor: pointer;

    &:before,
    &:after {
      background: red;
    }
  }

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1px;
    background: black;
    transition: all ease 250ms;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
