import { useState } from "react";
import { MdOutlineCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

export default function Game() {
  const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    [symbolPosition, setSymbolPosition] = useState([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]),
    onComputerPosition = (temp) => {
      const position = Math.floor(Math.random() * 9),
        has_blank = temp.indexOf("") === -1;

      if (has_blank) {
        return -1;
      }

      if (temp[position] === "") {
        return position;
      }

      return onComputerPosition(temp);
    },
    onComputerPlay = (temp) => {
      const computerPosition = onComputerPosition(temp);
      if (computerPosition > -1) temp[computerPosition] = "O";
      setSymbolPosition([...temp]);
      const winner = checkWinner(temp);
      if (winner !== "") console.log(winner);
    },
    onPlayClick = (index) => {
      const temp = [...symbolPosition];
      if (temp[index] === "") {
        temp[index] = "X";
        setSymbolPosition([...temp]);
        const winner = checkWinner(temp);
        if (winner === "")
          setTimeout(() => {
            onComputerPlay(temp);
          }, 1000);
        else console.log(winner);
      }
    },
    checkWinner = (temp) => {
      const all_x_position = temp
          .map((item, idx) => (item === "X" ? idx : ""))
          .filter((item) => item !== ""),
        all_o_position = temp
          .map((item, idx) => (item === "O" ? idx : ""))
          .filter((item) => item !== "");

      let is_x_winning = false,
        is_o_winning = false;

      if (!all_o_position.length && !all_x_position.length) {
        return;
      }

      for (let i = 0; i < winningPositions.length; i++) {
        const winningPosition = winningPositions[i];
        is_x_winning = winningPosition.every(
          (item) => all_x_position.indexOf(item) > -1
        );
        is_o_winning = winningPosition.every(
          (item) => all_o_position.indexOf(item) > -1
        );
        if (is_x_winning || is_o_winning) {
          return is_x_winning ? "X Win" : "O Win";
        }
      }
      return "";
    };

  return (
    <div className="grid grid-cols-3">
      {symbolPosition.map((symbol, i) => (
        <div
          onClick={() => onPlayClick(i)}
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
