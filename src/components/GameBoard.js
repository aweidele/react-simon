/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import GameButton from "./GameButton";
// import dummySequence from "../data/dummy-sequence";

const colors = ["lime", "red", "blue", "yellow"];
const rotate = ["", "rotate-90", "rotate-180", "-rotate-90"];
const order = ["order-1", "order-2", "order-4", "order-3"];

export default function GameBoard() {
  const [sequence, setSequence] = useState([]);
  const [sequenceTurn, setSequenceTurn] = useState(0);
  const [gameState, setGameState] = useState("gameover");
  const [gameOverFlashCount, setGameOverFlashCount] = useState(0);

  // const isPlayback = gameState === "playback-on" || gameState === "playback-pause";
  const isPlaybackOn = gameState === "playback-on" || gameState === "gameover-on" || gameState === "gameover" ? sequence[sequenceTurn] : null;
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
    } else if (gameState === "gameover-on") {
      setTimeout(() => {
        setGameState("gameover-off");
      }, 250);
    } else if (gameState === "gameover-off") {
      setTimeout(() => {
        const flashCount = gameOverFlashCount + 1;
        if (flashCount <= 2) {
          setGameState("gameover-on");
          setGameOverFlashCount((oldFlashCount) => flashCount);
        } else {
          setGameState("gameover");
          setGameOverFlashCount((oldFlashCount) => 0);
        }
      }, 250);
    }
  }, [gameState, gameOverFlashCount]);

  const handlePlayerClick = (index) => {
    if (index === sequence[sequenceTurn]) {
      const nextTurn = sequenceTurn + 1;
      if (nextTurn < sequence.length) {
        setSequenceTurn((prevSequence) => nextTurn);
      } else {
        setSequence((prevSequence) => [...prevSequence, Math.floor(Math.random() * 4)]);
        setSequenceTurn((prevSequence) => 0);
        setGameState("playback-pause");
      }
    } else {
      setGameState("gameover-on");
    }
  };

  const handleNewGame = () => {
    setSequence((prevSequence) => [Math.floor(Math.random() * 4)]);
    setSequenceTurn((prevSequence) => 0);
    setGameState("playback-pause");
  };

  // const handleRestart = () => {
  //   setSequenceTurn((prevSequence) => 0);
  //   setGameState("playback-on");
  // };

  return (
    <>
      <div className="grow py-4 flex items-center">
        <div className="grid grid-cols-2 grid-rows-2 p-4 rounded-full bg-slate-900 relative">
          {colors.map((color, index) => (
            <GameButton onClick={() => handlePlayerClick(index)} key={color} color={color} disabled={!isPlayerTurn} active={isPlaybackOn === index} extraClasses={`${rotate[index]} ${order[index]}`} playbackRate={1 + 0.2 * (index - 1)} />
          ))}
          {gameState === "gameover" && (
            <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white z-20 text-center">
              <p className="tracking-[0.4em]">gameover</p>
              <p>You made it to {sequence.length} turns!</p>
            </div>
          )}
        </div>
      </div>
      <div class="text-center p-4">
        <button onClick={handleNewGame} class={`transition-all border p-4 border-slate-500 rounded hover:border-red-500${gameState !== "gameover" && " opacity-30"}`} disabled={gameState !== "gameover"}>
          New Game
        </button>
        <p className="mt-4 text-xs">
          <a href="https://github.com/aweidele/react-simon" target="_blank">
            https://github.com/aweidele/react-simon
          </a>
        </p>
      </div>
      {/* <div className="absolute top-2 left-2 hidden">
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
          <tr>
            <td>
              <strong>Gameover FC</strong>
            </td>
            <td>{gameOverFlashCount}</td>
          </tr>
        </table>

        <button onClick={handleRestart} className="border p-2 my-8 hover:bg-slate-200">
          Restart
        </button>
      </div> */}
    </>
  );
}
