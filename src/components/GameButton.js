import { useState } from "react";
import ButtonSvg from "./ButtonSvg";

const buttonClasses = {
  lime: ["text-lime-600", "text-lime-900"],
  red: ["text-red-600", "text-red-900"],
  blue: ["text-blue-600", "text-blue-900"],
  yellow: ["text-yellow-300", "text-yellow-600"],
};

export default function GameButton({ color, extraClasses = "", active = false }) {
  const [buttonActive, setButtonActive] = useState(active);
  let buttonClass = "p-1 ";
  if (buttonActive) {
    buttonClass += `${buttonClasses[color][0]} ${extraClasses}`;
  } else {
    buttonClass += `${buttonClasses[color][1]} ${extraClasses}`;
  }

  function handleButton(pressed) {
    if (pressed) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }
  // const buttonClass = `text-${color}-${buttonActive ? 600 : 800}`;

  return (
    <button
      className={buttonClass}
      onMouseDown={() => {
        handleButton(true);
      }}
      onMouseUp={() => {
        handleButton(false);
      }}
    >
      <ButtonSvg />
    </button>
  );
}
