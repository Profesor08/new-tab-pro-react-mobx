import React, { useRef, useEffect, useState, useCallback } from "react";
import lottie, { AnimationItem } from "lottie-web";
import styled from "styled-components";
import { getWeatherIcon } from "../utils";

const Icon = styled.div``;

export const WeatherIcon = ({ type }: { type: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<AnimationItem | null>(null);

  useEffect(() => {
    setAnimation((animation) => {
      animation?.destroy();

      if (ref.current !== null) {
        return lottie.loadAnimation({
          container: ref.current,
          loop: false,
          autoplay: true,
          renderer: "svg",
          animationData: getWeatherIcon(type),
          rendererSettings: {
            className: "yXJMw",
          },
        });
      }

      return null;
    });
  }, [type]);

  const replay = useCallback(() => {
    animation?.playSegments([0, animation.totalFrames], true);
  }, [animation]);

  return <Icon ref={ref} onPointerEnter={replay} />;
};
