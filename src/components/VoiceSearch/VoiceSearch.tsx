import React, { useState } from "react";
import style from "./style.module.scss";

let speechRecognition: SpeechRecognition | null = null;

const useSpeechRecognition = (): [boolean, React.Dispatch<boolean>] => {
  const [recording, setRecording] = useState(false);

  try {
    if (speechRecognition === null) {
      speechRecognition = new webkitSpeechRecognition();

      speechRecognition.addEventListener("result", event => {
        setRecording(false);

        window.open(
          "http://google.ru/search?q=" + event.results[0][0].transcript,
          "",
        );
      });

      speechRecognition.addEventListener(
        "error",
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

  let className = style.microphone;

  if (recording) {
    className += " " + style["is-recording"];
  }

  return (
    <button className={className} onClick={() => setRecording(!recording)}>
      <div className={style.image} />
    </button>
  );
};

export default VoiceSearch;
