import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { theme, themeColorMixin } from "../theme/theme-default";
import { CloseButton } from "../components/buttons/CloseButton";

const FormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: 1000;
`;

interface IFormBackdropProps {
  active: boolean;
}

const FormBackdrop = styled.div<IFormBackdropProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: ease opacity ${theme.animationSpeed};

  ${(props) =>
    props.active === false
      ? css`
          opacity: 0;
          transform: translateX(-1000%) !important;
          transition: ease opacity ${theme.animationSpeed}, ease transform 0s;
          transition-delay: 0s, ${theme.animationSpeed};
        `
      : null}
`;

export const FormButtonsGroup = styled.div``;

interface IFormButtonProps {
  primary?: true;
  secondary?: true;
  error?: true;
  warning?: true;
  info?: true;
  success?: true;
  warn?: true;
  danger?: true;
}

export const FormButton = styled.button<IFormButtonProps>`
  font-size: 0.875rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: 0;
  background: transparent;
  padding: 6px 8px;
  ${(props) => themeColorMixin(props)}

  &:hover {
    cursor: pointer;
  }
`;

const FormCloseContainer = styled.div`
  grid-area: close;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormCloseButton = styled(CloseButton)`
  width: 20px;
  height: 20px;
`;

const FormInputText = styled.input`
  margin: 0;
  display: block;
  padding: 3px 0 7px 0;
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  font-size: 1rem;
`;

const FormInputLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1rem;
  letter-spacing: 0.00938em;
  transform-origin: top left;

  + ${FormInputText} {
    margin-top: 16px;
  }
`;

interface IFormInputProps {
  active?: boolean;
  hasText?: boolean;
}

const FormInputWrapper = styled.div<IFormInputProps>`
  position: relative;
  overflow: auto;

  ${FormInputLabel} {
    transform: ${(p) =>
      p.active || p.hasText
        ? `translate(0, 1.5px) scale(0.75) translateZ(0)`
        : `translate(0, 18px) scale(1) translateZ(0)`};
    color: ${(p) => (p.active ? `#1976d2` : `rgba(0, 0, 0, 0.54)`)};
  }

  ${FormInputText} {
    border-color: ${(p) => (p.active ? `#1976d2` : `lightgrey`)};
  }

  ${FormInputText}:hover & {
    background: red;
  }
`;

interface IFormTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormTextField = ({
  value,
  label,
  ...attributes
}: IFormTextFieldProps) => {
  const [active, setActive] = useState(false);
  const [hasText, setHasText] = useState(
    value !== undefined && value.toString().length > 0,
  );

  useEffect(() => {
    setHasText(value !== undefined && value.toString().length > 0);
  }, [value]);

  return (
    <FormInputWrapper active={active} hasText={hasText}>
      <FormInputLabel>{label}</FormInputLabel>
      <FormInputText
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={(e) => setHasText(e.target.value.length > 0)}
        value={value}
        {...attributes}
      />
    </FormInputWrapper>
  );
};

export const FormParagraph = styled.p`
  margin: 0 0 12px 0;
`;

interface IFormElementProps {
  active: boolean;
}

const FormElement = styled.form<IFormElementProps>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;
  background-color: white;
  width: 500px;
  transition: ease opacity ${theme.animationSpeed}, ease transform 0s,
    ease top ${theme.animationSpeed};
  transition-delay: 0s, 0s, 0s;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  display: grid;
  grid-template:
    "header close" auto
    "body body" auto
    "footer footer" auto / 1fr 50px;

  ${(props) =>
    props.active === false
      ? css`
          opacity: 0;
          top: calc(50% + 20px);
          transition: ease opacity ${theme.animationSpeed}, ease transform 0s,
            ease top ${theme.animationSpeed};
          transition-delay: 0s, ${theme.animationSpeed}, 0s;
          transform: translateX(-1000vw) !important;
        `
      : null}
`;

export const FormHeader = styled.div`
  padding: 0 10px 0 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 20px;
  font-weight: 300;
  grid-area: header;
`;

export const FormBody = styled.div`
  padding: 16px 24px;
  grid-area: body;

  ${FormInputWrapper} {
    margin-top: 16px;
    margin-bottom: 8px;
  }

  ${FormParagraph} {
    margin-bottom: 12px;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  grid-area: footer;
`;

interface IFormProps {
  active: boolean;
  closeAction?: () => any;
  children?: React.ReactNode;
  onSubmit?: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
}

export const Form = ({
  active,
  closeAction,
  children,
  onSubmit,
}: IFormProps) => {
  return (
    <FormContainer>
      <FormBackdrop active={active} onClick={closeAction} />
      <FormElement active={active} onSubmit={onSubmit}>
        <FormCloseContainer>
          <FormCloseButton onClick={closeAction} />
        </FormCloseContainer>
        {children}
      </FormElement>
    </FormContainer>
  );
};
