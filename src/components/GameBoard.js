import GameButton from "./GameButton";

export default function GameBoard() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 my-8 p-4 rounded-full bg-slate-700">
      <GameButton key="lime" color="lime" extraClasses="order-1" playbackRate={0.8} />
      <GameButton key="red" color="red" extraClasses=" order-2 rotate-90" playbackRate={1} />
      <GameButton key="blue" color="blue" extraClasses="order-4 rotate-180" playbackRate={1.2} />
      <GameButton key="yellow" color="yellow" extraClasses="order-3 -rotate-90" playbackRate={1.4} />
    </div>
  );
}
