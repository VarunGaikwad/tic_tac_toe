import { useEffect, useRef, useState } from "react";
import { MdOutlineCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import { TicTacToe } from "../class/TicTacToe";

Game.propTypes = {
  setScoreCard: PropTypes.func.isRequired,
};

export default function Game({ setScoreCard }) {
  const { current: game } = useRef(new TicTacToe()),
    [symbolPosition, setSymbolPosition] = useState(game.getGame()),
    onPlayClick = (index) => {
      game.setPosition(index, "X");
      setSymbolPosition([...game.getGame()]);
      if (checkWinner("You win!!")) {
        onComputerPlay();
      }
    },
    checkWinner = (player) => {
      let winner = game.whoIsWinning();
      if (winner) {
        setTimeout(() => {
          alert(winner === "-" ? "None win!!" : player);
          game.resetGame();
          setScoreCard(game.getScoreCard());
          setSymbolPosition([...game.getGame()]);
        }, 300);
        return;
      }

      return true;
    },
    onComputerPlay = () => {
      game.computerPlay();
      setSymbolPosition([...game.getGame()]);
      checkWinner("Computer win!!");
    };

  useEffect(() => {
    setScoreCard(game.getScoreCard());
  }, [game, setScoreCard]);

  return (
    <div className="grid grid-cols-3">
      {symbolPosition.map((symbol, i) => (
        <div
          onClick={() => symbol === "" && onPlayClick(i)}
          key={i}
          className={`play_symbol ${
            [2, 5, 8].indexOf(i) === -1 ? "border-r-8" : ""
          } ${[6, 7, 8].indexOf(i) === -1 ? "border-b-8" : ""}`}
        >
          <Cross symbol={symbol} />
          <Circle symbol={symbol} />
        </div>
      ))}
    </div>
  );
}

Circle.propTypes = {
  symbol: PropTypes.string.isRequired,
};

Cross.propTypes = {
  symbol: PropTypes.string.isRequired,
};

function Circle({ symbol }) {
  const flag = symbol === "O";
  return (
    <MdOutlineCircle
      className={`size-32 ${
        flag ? "opacity-100" : "opacity-0"
      } absolute transition-opacity duration-1000 ease-in`}
    />
  );
}

function Cross({ symbol }) {
  const flag = symbol === "X";
  return (
    <RxCross2
      className={`size-32 ${
        flag ? "opacity-100" : "opacity-0"
      } absolute transition-opacity duration-1000 ease-in`}
    />
  );
}
