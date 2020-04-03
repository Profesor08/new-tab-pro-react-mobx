import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components/macro";
import { theme } from "../../theme/theme-default";

const pulse = keyframes`
  0% {
    transform: translate(0, 10%) scale3d(1, 1, 1) translateZ(0);
  }

  100% {
    transform: translate(0, 0) scale3d(1.2, 1.2, 1) translateZ(0);
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR42u2Xz2sTQRSAX8VSb1K8iNqKooJH2Ux6Ksn+iPQqxZMIehJB0do/IMhmQWsvHr2KSEGk0tSLIoWIYNUKij20F2/N7iaUZnYT0kYzzhMKs0HDJiTdLcwHDwKZSd63781LBiQSSW9JZdkhzfKm1Rz9mjZp/W9YdEU3vXv4HsQZ40FtNG36q5rls//Ej4tmbSS2T15Mvp3ExOPmEMQNbBtMMEyoljcFcQN7PqyAlqNfIG7gYQ0tYNIaxA1MrJPY3wImbUqBKAXSFv0tBSIVMOkvKRDtGKWN/T6FdqRAxFNoWwpEPIXqUqBT6ALU/UVgu8GW4GD3f6f9TRDYNJTDrk7YbtiqUumHwIYoUJuHERDAS0r4CvgFECgbY+cFAR7KT+g1POmCKFDNw6WggHc3fBtVb4CAoyauBgXIG+g1Xh5mRAGah6cggBd11fK/h7lOprIs0H6uRl6KAo5O7kOv4QmPiwJ4Jqqv4FiwCtXjvD2+tRmfK6kZ/ygI2HritK0rDVGgrClJ6DWMwYC/AGuCBMYcIC2V0CzvjmbRz3j3xUjn6CfeYreUJ2wQkGD75INPX1mFfsEFrrcIYCvdhC4paWQakxajpJMr0C9YFg54i7AsClRmh9/xnr0NHcInzZStk2aLwAcGMAD9pPIazvFKVDD5rdnhJeHLX5RTyRPQHpz5o66emMc9wdlPtvA8wF7Aq2BUHh1525qEo5JtR1WeOXpickO9cJIpyuD6xJmhYiZ5ytWSl3mlnuOaf+2zDaLDXmJrSgZ/MYVEugo+gSh+FkSBa4yd5Ul87DZ5XpFl/AyIEjzYjkau8WqshU2cr13HPbgX4gJOD97n465GZlyVvC9mSKloKI2iTnbwNT+gBX54H+IaXAtxJzE3ycSAFqSAFJACUkAikXD+AHj5/wx2o5osAAAAAElFTkSuQmCC)
    no-repeat center center;
  background-size: 95% 95%;
  transition: ease transform 0.5s;
  transform-origin: 50% 50%;
  transform: translate(0, 0) scale3d(1, 1, 1) translateZ(0);
`;

interface IButtonProps {
  active?: boolean;
}

const Button = styled.div<IButtonProps>`
  position: absolute;
  top: 10px;
  left: 50%;
  margin-left: -24px;
  width: 48px;
  height: 48px;
  z-index: 99;
  border: 2px solid ${theme.mainBorderColor};
  border-radius: 5px;
  background: transparent;
  outline: none;
  overflow: hidden;
  transition: ease border-color 0.2s, ease border-radius 0.2s;
  transform-origin: 50% 50%;

  ${(props) => {
    if (props.active) {
      return css`
        border: 2px solid rgba(255, 255, 255, 1);
        background-color: #86261b;
        border-radius: 26px;

        ${Icon} {
          transform: translate(0, 10%) scale3d(1, 1, 1) translateZ(0);
          animation: ${pulse} 0.6s 0.5s infinite linear;
          animation-direction: alternate;
        }
      `;
    }
  }}

  &:hover {
    cursor: pointer;

    ${Icon} {
      transform: scale3d(1.12, 1.12, 1) translateZ(0);
    }
  }
`;

let speechRecognition: SpeechRecognition | null = null;

const useSpeechRecognition = (): [boolean, React.Dispatch<boolean>] => {
  const [recording, setRecording] = useState(false);

  try {
    if (speechRecognition === null) {
      speechRecognition = new webkitSpeechRecognition();

      speechRecognition.addEventListener("result", (event) => {
        setRecording(false);

        window.open(
          "http://google.ru/search?q=" + event.results[0][0].transcript,
          "",
        );
      });

      speechRecognition.addEventListener(
        "error",
        // @ts-ignore
        (event: SpeechRecognitionError) => {
          if (event.error !== "no-speech") {
            console.warn("%cERROR: " + event.error, "color: #FF0000;");
            console.warn(event);
          }

          setRecording(false);
        },
      );
    }

    if (recording) {
      speechRecognition.start();
    } else {
      speechRecognition.stop();
    }
  } catch (err) {
    console.warn(err);
  }

  return [recording, setRecording];
};

export const VoiceSearch = () => {
  const [recording, setRecording] = useSpeechRecognition();

  return (
    <Button active={recording} onClick={() => setRecording(!recording)}>
      <Icon />
    </Button>
  );
};
