import GameBoard from "./components/GameBoard";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <header className="App-header">
        <h1 className="text-center text-2xl">Start of the Simon game</h1>
      </header>
      <GameBoard />
    </div>
  );
}
