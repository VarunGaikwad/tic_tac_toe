import { useState } from "react";
import { MdOutlineCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export default function Game() {
  const [symbolPosition, setSymbolPosition] = useState([
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
    onPlayClick = (index) => {
      const temp = [...symbolPosition];
      if (!temp[index]) {
        temp[index] = "X";
        setSymbolPosition(temp);
      }
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
          {symbol === "X" ? <Cross /> : symbol === "O" ? <Circle /> : <></>}
        </div>
      ))}
    </div>
  );
}

function Circle() {
  return <MdOutlineCircle className="size-32" />;
}

function Cross() {
  return <RxCross2 className="size-32" />;
}
