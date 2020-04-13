import React from "react";
import "../App.css";
class GameGrid extends React.Component {
  state = {
    grid: ["", "", "", "", "", "", "", "", ""],
    player1: "X",
    player2: "O",
    counter: 0,
    turn: 1,
    winCombinations: [],
    winner: "",
  };

  checkWinner = () => {
    const { winCombinations, grid, turn } = this.state;
    const currentPlayer = turn === 1 ? "O" : "X";

    this.setState({ checked: currentPlayer });
    let positions = [];
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === currentPlayer) {
        positions.push(i + 1);
      }
    }

    for (let i = 0; i < winCombinations.length; i++) {
      let wincounter = 0;

      for (let j = 0; j < winCombinations[i].length; j++) {
        if (winCombinations[i][j] === positions[j]) {
          wincounter++;
          if (wincounter === 3) {
            this.setState({
              winner: currentPlayer === "X" ? "player1" : "player2",
            });
          }
        }
      }
    }
  };

  generateWinOrder = () => {
    const rowLength = 3;
    const wins = [];
    const { grid, player1 } = this.state;

    let horizontalWins = [];
    let verticalWins = [];
    let diagonalWins = [];
    for (let i = 1; i <= grid.length; i++) {
      horizontalWins.push(i);
      if (i % rowLength === 0) {
        wins.push(horizontalWins);
        horizontalWins = [];
      }
    }

    const firstRow = [...wins[0]];
    // console.log(firstRow);
    const firstNumFirstRow = firstRow[0];
    const lastNumLastRow = firstRow[firstRow.length - 1];
    const diagonalCalculate = [firstNumFirstRow, lastNumLastRow];

    for (let i = 0; i < diagonalCalculate.length; i++) {
      diagonalWins.push(diagonalCalculate[i]);
      for (let j = 0; j < diagonalCalculate.length; j++) {
        if (i === 0) {
          diagonalWins.push(diagonalWins[j] + rowLength + 1);
        } else {
          diagonalWins.push(diagonalWins[j] + rowLength - 1);
        }
      }
      wins.push(diagonalWins);
      diagonalWins = [];
    }

    for (let i = 0; i < firstRow.length; i++) {
      verticalWins.push(firstRow[i]);
      for (let j = 0; j < firstRow.length - 1; j++) {
        verticalWins.push(verticalWins[j] + rowLength);
      }
      wins.push(verticalWins);
      verticalWins = [];
    }

    this.setState({ winCombinations: wins });
  };

  componentDidMount() {
    this.generateWinOrder();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.grid !== this.state.grid) {
      // console.log("checked");
      this.checkWinner();
    }
  }

  handleClick = (e) => {
    let id = Number(e.target.id.slice(4));

    if (e.target.innerText) return;

    if (this.state.counter % 2 === 0) {
      this.setState((currentState) => {
        return {
          grid: [...currentState.grid].map((gridBox, index) => {
            if (index + 1 === id) {
              return (gridBox = currentState.player1);
            } else {
              return gridBox;
            }
          }),
          counter: currentState.counter + 1,
          turn: currentState.turn + 1,
        };
      });
    } else {
      this.setState((currentState) => {
        return {
          grid: [...currentState.grid].map((gridBox, index) => {
            if (index + 1 === id) {
              return (gridBox = currentState.player2);
            } else {
              return gridBox;
            }
          }),
          counter: currentState.counter + 1,
          turn: currentState.turn - 1,
        };
      });
    }
  };
  render() {
    const { grid, winner } = this.state;

    return (
      <div className="Grid-Wrapper">
        {grid.map((gridBox, index) => {
          return (
            <div
              id={`box-${index + 1}`}
              key={`box-${index + 1}`}
              onClick={this.handleClick}
            >
              {gridBox}
            </div>
          );
        })}
        {winner && <p>{winner} wins</p>}
      </div>
    );
  }
}

export default GameGrid;
