import GameBoard from "./components/GameBoard";

export default function App() {
  return (
    <div className="max-w-xl mx-auto px-2.5 font-body">
      <header className="App-header">
        <h1 className="text-center text-3xl my-8 uppercase tracking-widest">React Simon!</h1>
      </header>
      <GameBoard />
    </div>
  );
}
