import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components/macro";
import options from "../../store/options";
import { FlyingThroughSpace } from "./theme/FlyingThroughSpace/FlyingThroughSpace";
import { observer } from "mobx-react";

const BackgroundCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const Background = observer(() => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [space, setSpace] = useState<FlyingThroughSpace | null>(null);

  if (space !== null) {
    if (options.backgroundStarSpaceAnimation) {
      space.start();
    } else {
      space.stop();
    }
  }

  useEffect(() => {
    if (space === null && ref.current !== null) {
      setSpace(new FlyingThroughSpace(ref.current));
    }
  }, [space]);

  return <BackgroundCanvas ref={ref} />;
});
