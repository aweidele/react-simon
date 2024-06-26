import { useState, useEffect } from "react";
import GameButton from "./GameButton";
import dummySequence from "../data/dummy-sequence";

const colors = ["lime", "red", "blue", "yellow"];
const rotate = ["", "rotate-90", "rotate-180", "-rotate-90"];
const order = ["order-1", "order-2", "order-4", "order-3"];

export default function GameBoard() {
  const [sequence, setSeqence] = useState(dummySequence);
  const [sequenceTurn, setSequenceTurn] = useState(0);
  const [gameState, setGameState] = useState("playback-on");

  const isPlayback = gameState === "playback-on" || gameState === "playback-pause";
  const isPlaybackOn = gameState === "playback-on";
  const isPlayerTurn = gameState === "player-turn";

  useEffect(() => {
    if (gameState === "playback-on") {
      setTimeout(() => {
        const nextTurn = sequenceTurn + 1;
        if (nextTurn < sequence.length) {
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

  const handlePlayerClick = (index) => {
    if (index === sequence[sequenceTurn]) {
      const nextTurn = sequenceTurn + 1;
      if (nextTurn < sequence.length) {
        setSequenceTurn((prevSequence) => nextTurn);
      } else {
        setSeqence((prevSequence) => [...prevSequence, Math.floor(Math.random() * 4)]);
        setSequenceTurn((prevSequence) => 0);
        setGameState("playback-on");
      }
    }
  };

  const handleRestart = () => {
    setSequenceTurn((prevSequence) => 0);
    setGameState("playback-on");
  };

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 my-8 p-4 rounded-full bg-slate-700">
        {colors.map((color, index) => (
          <GameButton onClick={() => handlePlayerClick(index)} key={color} color={color} disabled={!isPlayerTurn} active={isPlaybackOn && sequence[sequenceTurn] === index} extraClasses={`${rotate[index]} ${order[index]}`} />
        ))}
      </div>
      <div className="absolute top-2 left-2">
        <ol>
          {sequence.map((turn, index) => (
            <li className={index === sequenceTurn && "font-bold"}>
              {turn} - {colors[turn]}
            </li>
          ))}
        </ol>
        <table className="my-4">
          <tr>
            <td>
              <strong>Sequence Turn</strong>
            </td>
            <td>{sequenceTurn}</td>
          </tr>
          <tr>
            <td>
              <strong>Current:</strong>
            </td>
            <td>
              {sequence[sequenceTurn]} - {colors[sequence[sequenceTurn]]}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Mode:</strong>
            </td>
            <td>{gameState}</td>
          </tr>
          <tr>
            <td>
              <strong>Is Playing</strong>
            </td>
            <td>Is playing? {isPlayback ? "Yes" : "No"}</td>
          </tr>
        </table>

        <button onClick={handleRestart} className="border p-2 my-8 hover:bg-slate-200">
          Restart
        </button>
      </div>
    </>
  );
}
