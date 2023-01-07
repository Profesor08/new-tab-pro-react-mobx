import styled from "styled-components/macro";
import React, { useRef, useEffect } from "react";

function constrain(n: number, low: number, high: number): number {
  return Math.max(Math.min(n, high), low);
}

function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  withinBounds?: boolean,
): number {
  const newValue =
    ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newValue;
  }
  if (start2 < stop2) {
    return constrain(newValue, start2, stop2);
  } else {
    return constrain(newValue, stop2, start2);
  }
}

let initialized = false;

const useSitesPanelAnimation = (
  ref: React.MutableRefObject<null | HTMLElement>,
) => {
  useEffect(() => {
    const container = ref.current;

    if (container !== null && initialized === false) {
      initialized = false;

      let activated = false;

      const pos = {
        mx: container.offsetWidth / 2,
        my: container.offsetHeight / 2,
        x: container.offsetWidth / 2,
        y: container.offsetHeight / 2,
        rx: container.offsetWidth / 2,
        ry: container.offsetHeight / 2,
      };

      let lastTime = Date.now();
      const speed = 3.0;

      container.addEventListener("mouseenter", (e) => {
        pos.mx = container.offsetWidth / 2;
        pos.my = container.offsetHeight / 2;
        pos.x = pos.mx;
        pos.y = pos.my;

        if (activated === false) {
          activated = true;
          animate();
        }
      });

      container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        pos.mx = e.clientX - rect.left;
        pos.my = e.clientY - rect.top;
      });

      container.addEventListener("mouseleave", (e) => {
        pos.mx = container.offsetWidth / 2;
        pos.my = container.offsetHeight / 2;
      });

      const animate = () => {
        requestAnimationFrame(animate);

        const now = Date.now();
        const dt = now - lastTime;
        lastTime = now;

        let ease_t = (dt / 1000) * speed;

        if (ease_t > 1) {
          ease_t = 1;
        }

        pos.x += Number(((pos.mx - pos.x) * ease_t).toFixed(2));
        pos.y += Number(((pos.my - pos.y) * ease_t).toFixed(2));

        const halfW = container.offsetWidth / 2;
        const halfH = container.offsetHeight / 2;

        let rotateY = parseFloat(
          map(Math.abs(pos.x - halfW), 0, halfW, 0, 5).toFixed(2),
        );

        let rotateX = parseFloat(
          map(Math.abs(pos.y - halfH), 0, halfH, 0, 5).toFixed(2),
        );

        if (pos.x - halfW < 0) {
          rotateY *= -1;
        }

        if (pos.y - halfH > 0) {
          rotateX *= -1;
        }

        container.style.transform = `perspective(900px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) translate3d(0, 0, 0)`;
      };
    }
  }, [ref]);
};

const AnimationPanelElement = styled.div`
  will-change: transform;
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: translateZ(0);
`;

export const AnimationPanel = styled(({ children, ...rest }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useSitesPanelAnimation(ref);

  return (
    <AnimationPanelElement ref={ref} {...rest}>
      {children}
    </AnimationPanelElement>
  );
})``;
