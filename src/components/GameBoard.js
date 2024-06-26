import { useState, useEffect } from "react";
import GameButton from "./GameButton";
import dummySequence from "../data/dummy-sequence";

const clr = ["green", "red", "blue", "yellow"];

export default function GameBoard() {
  const [sequenceTurn, setSequenceTurn] = useState(0);
  const [gameState, setGameState] = useState("playback-on");

  const isPlayback = gameState === "playback-on" || gameState === "playback-pause";
  const isPlaybackOn = gameState === "playback-on";
  const isPlayerTurn = gameState === "player-turn";

  useEffect(() => {
    if (gameState === "playback-on") {
      setTimeout(() => {
        const nextTurn = sequenceTurn + 1;
        if (nextTurn < dummySequence.length) {
          setSequenceTurn((prevSequence) => nextTurn);
          setGameState("playback-pause");
        } else {
          setGameState("player-turn");
          setSequenceTurn((prevSequence) => 0);
        }

        console.log(`turn: ${nextTurn}`);
      }, 1000);
    } else if (gameState === "playback-pause") {
      setTimeout(() => {
        setGameState("playback-on");
      }, 250);
    }
  }, [gameState]);

  const handleRestart = () => {
    setSequenceTurn((prevSequence) => 0);
    setGameState("playback-on");
  };

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 my-8 p-4 rounded-full bg-slate-700">
        <GameButton key="lime" color="lime" extraClasses="order-1" playbackRate={0.8} disabled={!isPlayerTurn} active={isPlaybackOn && dummySequence[sequenceTurn] === 0} />
        <GameButton key="red" color="red" extraClasses=" order-2 rotate-90" playbackRate={1} disabled={!isPlayerTurn} active={isPlaybackOn && dummySequence[sequenceTurn] === 1} />
        <GameButton key="blue" color="blue" extraClasses="order-4 rotate-180" playbackRate={1.2} disabled={!isPlayerTurn} active={isPlaybackOn && dummySequence[sequenceTurn] === 2} />
        <GameButton key="yellow" color="yellow" extraClasses="order-3 -rotate-90" playbackRate={1.4} disabled={!isPlayerTurn} active={isPlaybackOn && dummySequence[sequenceTurn] === 3} />
      </div>
      <div className="absolute top-2 left-2">
        <ol>
          {dummySequence.map((turn, index) => (
            <li className={index === sequenceTurn && "font-bold"}>
              {turn} - {clr[turn]}
            </li>
          ))}
        </ol>
        <p>{dummySequence[sequenceTurn]}</p>
        <p>{gameState}</p>
        <p>Is playing? {isPlayback ? "Yes" : "No"}</p>
        <button onClick={handleRestart} className="border p-2 my-8 hover:bg-slate-200">
          Restart
        </button>
      </div>
    </>
  );
}
