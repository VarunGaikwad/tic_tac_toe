import { useState } from "react";
import Game from "./components/Game";

export default function App() {
  const [scoreCard, setScoreCard] = useState([0, 0, 0]);

  return (
    <div className="h-screen bg-black text-slate-100 flex flex-col items-center pt-10 text-2xl">
      <Game setScoreCard={setScoreCard} />
      <div className="w-1/3 mt-10">
        <div className="flex justify-evenly">
          <p className="w-full text-center">You(X)</p>
          <p className="w-full text-center">Tie</p>
          <p className="w-full text-center">Computer (O)</p>
        </div>
        <div className="flex justify-evenly text-5xl">
          {scoreCard.map((score, i) => (
            <p key={i} className="w-full text-center">
              {score}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
