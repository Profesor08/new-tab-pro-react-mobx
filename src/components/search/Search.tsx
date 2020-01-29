import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CloseButton } from "../buttons/CloseButton";

const InputOutline = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -2px);
  width: 0;
  height: 2px;
  background: #4285f4;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  padding: 10px 40px 10px 10px;
  font-size: 0.9rem;

  &:focus {
    background-color: #e6eefd;
    transition: ease background-color var(--animation-speed);

    ~ ${InputOutline} {
      width: 100%;
      transition: ease width var(--animation-speed);
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;

  ${CloseButton} {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    opacity: 0.5;
  }
`;

interface ISearchInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchInput = styled(
  ({ onChange, className, ...props }: ISearchInputProps) => {
    const [value, setValue] = useState<string>(props.value || "");

    useEffect(() => {
      if (onChange) {
        onChange(value);
      }
    }, [value]);

    return (
      <InputWrapper className={className}>
        <Input
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          {...props}
        />
        <CloseButton
          onClick={() => {
            setValue("");
          }}
        />
      </InputWrapper>
    );
  },
)``;
