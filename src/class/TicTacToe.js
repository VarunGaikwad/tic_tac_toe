export class TicTacToe {
  game = ["", "", "", "", "", "", "", "", ""];
  winningPositions = [
    "0,1,2",
    "3,4,5",
    "6,7,8",
    "0,3,6",
    "1,4,7",
    "2,5,8",
    "0,4,8",
    "2,4,6",
  ];
  player_win_count = 0;
  computer_win_count = 0;
  tie_count = 0;

  setPosition(index, symbol) {
    if (isNaN(index) || index < 0 || index > 8) {
      return new Error("Invalid index");
    }

    if (symbol !== "X" && symbol !== "O") {
      return new Error("Invalid symbol");
    }

    if (this.game[index] === "") {
      this.game[index] = symbol;
    } else {
      return new Error("Position already taken");
    }
  }

  computerPlay() {
    const index = this.getComputerPosition();
    this.setPosition(index, "O");
  }

  getComputerPosition() {
    const position = Math.floor(Math.random() * 9),
      has_blank = this.game.includes("");

    if (!has_blank) {
      return -1;
    }

    if (this.game[position] === "") {
      return position;
    }

    return this.getComputerPosition();
  }

  getGame() {
    return this.game;
  }

  resetGame() {
    this.game = ["", "", "", "", "", "", "", "", ""];
  }

  getScoreCard() {
    return [this.player_win_count, this.tie_count, this.computer_win_count];
  }

  whoIsWinning() {
    let all_x_positions = [],
      all_o_positions = [];

    for (let index = 0; index < this.game.length; index++) {
      const element = this.game[index];

      if (element === "O") {
        all_o_positions.push(index);
      }

      if (element === "X") {
        all_x_positions.push(index);
      }
    }
    all_x_positions = all_x_positions.toString();
    all_o_positions = all_o_positions.toString();

    for (let index = 0; index < this.winningPositions.length; index++) {
      const element = this.winningPositions[index];
      if (all_x_positions.indexOf(element) > -1) {
        this.player_win_count++;
        return "X";
      }
      if (all_o_positions.indexOf(element) > -1) {
        this.computer_win_count++;
        return "O";
      }
    }
    const still_playing = this.game.includes("");

    if (!still_playing) {
      this.tie_count++;
      return "-";
    }
  }
}
