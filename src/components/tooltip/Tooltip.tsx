import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HTMLMotionProps, motion } from "framer-motion";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  Placement,
  ReferenceType,
  shift,
  useClick,
  useDismiss,
  useFloating,
  UseFloatingProps,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";

const TooltipContainer = styled(motion.div)`
  z-index: 1000;
`;

export const ItemTooltip = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & {
    placement?: Placement;
  }
>(({ children, placement, ...props }, ref) => {
  const direction = placement === "top" ? -1 : 1;
  const y = -10 * direction;

  return (
    <TooltipContainer
      ref={ref}
      animate={{ opacity: [0, 1], y: [y, 0] }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </TooltipContainer>
  );
});

interface ITooltipRefferenceProps {
  reference: (node: ReferenceType | null) => void;
  referenceProps: Record<string, unknown>;
}

interface ITooltipFloatingProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ITooltip {
  toggle: (props: ITooltipRefferenceProps) => React.ReactElement;
  content?: (props: ITooltipFloatingProps) => React.ReactElement;
  floatingProps?: Pick<UseFloatingProps, "open" | "placement">;
  behavior?: "hover" | "click";
  onOpen?: () => void;
}

export const Tooltip = styled<Styled<ITooltip>>(
  ({ toggle, content, floatingProps = {}, behavior = "hover", onOpen }) => {
    const [open, setOpen] = useState(floatingProps.open ?? false);
    const {
      x,
      y,
      reference,
      floating,
      strategy,
      context,
      placement,
      update,
      refs,
    } = useFloating({
      strategy: "fixed",
      placement: floatingProps.placement ?? "bottom",
      middleware: [offset(10), flip(), shift()],
      open,
      onOpenChange: setOpen,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useHover(context, { enabled: behavior === "hover" }),
      useFocus(context, { enabled: behavior === "hover" }),
      useClick(context, { enabled: behavior === "click" }),
      useDismiss(context, { enabled: behavior === "click" }),
    ]);

    const direction = placement === "top" ? -1 : 1;

    const animation = {
      y: -10 * direction,
    };

    useEffect(() => {
      const reference = refs.reference.current;
      const floating = refs.floating.current;

      if (reference !== null && floating !== null) {
        return autoUpdate(reference, floating, update);
      }
    });

    useEffect(() => {
      if (open === true) {
        onOpen?.();
      }
    }, [onOpen, open]);

    return (
      <>
        {toggle({
          reference,
          referenceProps: getReferenceProps(),
        })}
        <FloatingPortal root={document.body}>
          {open === true && content !== undefined && (
            <TooltipContainer
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
              animate={{ opacity: [0, 1], y: [animation.y, 0] }}
              transition={{ duration: 0.2 }}
              {...getFloatingProps()}
            >
              {content({ open, setOpen })}
            </TooltipContainer>
          )}
        </FloatingPortal>
      </>
    );
  },
)``;
