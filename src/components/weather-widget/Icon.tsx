import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";
import styled from "styled-components";
import { getWeatherIcon } from "./utils";

const Icon = styled.div``;

export const WeatherIcon = ({ type }: { type: string }) => {
  const ref: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

  let animation: lottie.AnimationItem | null = null;

  useEffect(() => {
    animation = lottie.loadAnimation({
      wrapper: ref.current,
      loop: false,
      autoplay: true,
      renderer: "svg",
      animationData: getWeatherIcon(type),
      rendererSettings: {
        LM: true,
        className: "yXJMw",
      },
    });
  });

  return (
    <Icon
      ref={ref}
      onMouseEnter={() => {
        if (animation) {
          animation.playSegments([0, animation.totalFrames], true);
        }
      }}
    />
  );
};
