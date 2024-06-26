import { useState, useEffect } from "react";
import ButtonSvg from "./ButtonSvg";
// import useSound from "use-sound";
// import tone from "../assets/tone3.mp3";

const buttonClasses = {
  lime: ["text-lime-500", "text-lime-800"],
  red: ["text-red-500", "text-red-800"],
  blue: ["text-blue-500", "text-blue-800"],
  yellow: ["text-yellow-300", "text-yellow-600"],
};

export default function GameButton({ color, extraClasses = "", active = false, playbackRate = 1, ...props }) {
  const [buttonActive, setButtonActive] = useState(active);

  useEffect(() => {
    setButtonActive(active);
  }, [active]);

  let buttonClass = "p-1 relative transition-all ";
  if (buttonActive) {
    buttonClass += `${buttonClasses[color][0]} ${extraClasses}`;
  } else {
    buttonClass += `${buttonClasses[color][1]} ${extraClasses}`;
  }

  // const [play, { stop }] = useSound(tone, { playbackRate });
  // if (buttonActive) {
  //   play();
  // } else {
  //   stop();
  // }

  function handleButton(pressed) {
    if (pressed) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }

  return (
    <>
      <button
        className={buttonClass}
        onMouseDown={() => {
          handleButton(true);
        }}
        onMouseUp={() => {
          handleButton(false);
        }}
        onTouchStart={() => {
          handleButton(true);
        }}
        onTouchEnd={() => {
          handleButton(false);
        }}
        {...props}
      >
        <ButtonSvg />
        {/* <span class="absolute text-white text-xsz-10 bottom-1 right-1">{buttonActive ? "📳" : "📴"}</span> */}
      </button>
    </>
  );
}
