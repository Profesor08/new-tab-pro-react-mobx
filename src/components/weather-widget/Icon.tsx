import React, { useRef, useEffect, useState, useCallback } from "react";
import lottie from "lottie-web";
import styled from "styled-components";
import { getWeatherIcon } from "./utils";

const Icon = styled.div``;

export const WeatherIcon = ({ type }: { type: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<lottie.AnimationItem>();

  useEffect(() => {
    setAnimation((animation) => {
      animation?.destroy();

      return lottie.loadAnimation({
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
  }, [type]);

  const replay = useCallback(() => {
    animation?.playSegments([0, animation.totalFrames], true);
  }, [animation]);

  return <Icon ref={ref} onPointerEnter={replay} />;
};
