import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { FlyingThroughSpace } from "./theme/FlyingThroughSpace/FlyingThroughSpace";
import { useOptions } from "./../../store/options";

const BackgroundCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Background = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [space, setSpace] = useState<FlyingThroughSpace | null>(null);
  const starSpace = useOptions((state) => state.starSpace);

  useEffect(() => {
    if (space === null && ref.current !== null) {
      setSpace(new FlyingThroughSpace(ref.current));
    }
  }, [space]);

  useEffect(() => {
    if (starSpace === true) {
      space?.start();
    } else {
      space?.stop();
    }
  }, [space, starSpace]);

  return <BackgroundCanvas ref={ref} />;
};
