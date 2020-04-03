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
  });

  return <BackgroundCanvas ref={ref} />;
});

/*
import { OptionsAppInitialState } from "../../store/reducers/optionsApp";

interface BackgroundDispatchProps {}

interface BackgroundStateProps {
  show: boolean;
}

type Props = BackgroundDispatchProps & BackgroundStateProps;

class Background extends Component<Props> {
  canvas: React.RefObject<HTMLCanvasElement>;
  space: FlyingThroughSpace | null;

  constructor(props: Props) {
    super(props);

    this.canvas = React.createRef();
    this.space = null;
  }

  componentDidMount = () => {
    if (this.canvas.current) {
      this.space = new FlyingThroughSpace(this.canvas.current);
      if (this.props.show) {
        this.space.start();
      }
    }
  };

  render() {
    if (this.space) {
      if (this.props.show) {
        this.space.start();
      } else {
        this.space.stop();
      }
    }

    return (
      <div className={style.background}>
        <canvas className={style.canvas} ref={this.canvas} />
      </div>
    );
  }
}

interface State {
  optionsApp: OptionsAppInitialState;
}

const mapStateToProps = (state: State): BackgroundStateProps => {
  return {
    show: state.optionsApp.backgroundStarSpaceAnimation,
  };
};

const mapDispatchToProps = (): BackgroundDispatchProps => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Background);
*/
