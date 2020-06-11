import React from "react";
import "../App.css";
import PlayerOne from "./PlayerOne";
import PlayerTwo from "./PlayerTwo";
import GridGenerator from "./Grid-Generator";
class GameGrid extends React.Component {
  state = {
    boardSize: 9,
    board: ["", "", "", "", "", "", "", "", ""],
    playerOne: { name: "Player1", icon: "X", gamesWon: 0 },
    playerTwo: { name: "Player 2", icon: "O", gamesWon: 0 },
    playerOneInput: "",
    playerTwoInput: "",
    counter: 0,
    turn: 1,
    winCombinations: [],
    winner: "",
  };

  handleboardSize = (e) => {
    const { value } = e.target;
    const newboardSize = Math.pow(value, 2);
    if (value % 2 === 0) {
      return;
    } else {
      this.setState({
        boardSize: newboardSize,
        grid: [...Array(newboardSize)],
      });
    }
  };

  handleNameChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleNameSubmit = (e) => {
    const { playerOneInput, playerTwoInput } = this.state;
    e.preventDefault();
    const { name } = e.target;
    const playerInput = name === "playerOne" ? playerOneInput : playerTwoInput;
    console.log(playerInput);
    const updatedPlayer = { ...this.state[name] };
    updatedPlayer.name = playerInput;
    this.setState({ [name]: updatedPlayer });
  };
  handleIconChange = (e) => {
    const { value, name } = e.target;
    console.log(name, value);
    const updatedPlayer = { ...this.state[name] };
    updatedPlayer.icon = value;
    this.setState({
      [name]: updatedPlayer,
    });
  };

  checkWinner = () => {
    const {
      winCombinations,
      board,
      turn,
      playerOneIcon,
      playerOneName,
      playerTwoName,
    } = this.state;
    const currentPlayer = turn === 1 ? "O" : "X";

    this.setState({ checked: currentPlayer });
    let positions = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === currentPlayer) {
        positions.push(i + 1);
      }
    }

    for (let i = 0; i < winCombinations.length; i++) {
      let wincounter = 0;

      for (let j = 0; j < winCombinations[i].length; j++) {
        if (winCombinations[i][j] === positions[j]) {
          wincounter++;
          if (wincounter === winCombinations[i].length) {
            this.setState({
              winner:
                currentPlayer === playerOneIcon ? playerOneName : playerTwoName,
            });
          }
        }
      }
    }
  };

  generateHorizontalWins = () => {
    const { board } = this.state;
    const rowLength = Math.sqrt(board.length);
    let blockNumbers = board.map((el, index) => {
      el = index + 1;
      return el;
    });
    let horzWins = [];
    let lineWins = [];
    for (let i = 0; i <= blockNumbers.length; i++) {
      lineWins.push(blockNumbers[i]);
      if (blockNumbers[i] % rowLength === 0) {
        horzWins.push(lineWins);
        lineWins = [];
      }
    }
    console.log(horzWins, " --->horizon");
    return blockNumbers;
  };

  generateVerticalWins = () => {
    const { board } = this.state;
    const rowLength = Math.sqrt(board.length);
    let firstRow = [...Array(rowLength + 1).keys()].splice(1, rowLength);
    let vertWins = [];
    console.log(firstRow.length);
    for (let i = 0; i < firstRow.length; i++) {
      let lineWins = [firstRow[i]];
      for (let j = 0; j < firstRow.length - 1; j++) {
        lineWins.push(lineWins[j] + firstRow.length);
      }
      vertWins.push(lineWins);
    }
    console.log(vertWins, " --->vertical");
  };
  generateDiagonalWins = () => {
    const { board } = this.state;
    const rowLength = Math.sqrt(board.length);
    let firstRow = [...Array(rowLength + 1).keys()].splice(1, rowLength);
    let firstRowFirstNumber = firstRow[0];
    let firstRowLastNumber = firstRow[firstRow.length - 1];
    let rowBaseToCalcWin = [firstRowFirstNumber, firstRowLastNumber];
    let diagonalWins = [];
    console.log(firstRow.length);
    for (let i = 0; i < rowBaseToCalcWin.length; i++) {
      let lineWins = [rowBaseToCalcWin[i]];
      console.log(lineWins);
      for (let j = 0; j < firstRow.length - 1; j++) {
        if (i === 0) {
          lineWins.push(lineWins[j] + firstRow.length + 1);
        } else {
          lineWins.push(lineWins[j] + firstRow.length - 1);
        }
      }
      diagonalWins.push(lineWins);
    }
    console.log(diagonalWins, " --->diagonal");
  };

  componentDidMount() {
    this.generateHorizontalWins();
    this.generateVerticalWins();
    this.generateDiagonalWins();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.board !== this.state.board) {
      // console.log("checked");
      this.checkWinner();
    }
  }
  handleReset = (e) => {
    this.setState({
      grid: ["", "", "", "", "", "", "", "", ""],
      counter: 0,
      turn: 1,
      winner: "",
    });
  };

  handleClick = (e) => {
    if (this.state.winner) {
      return;
    }
    let id = Number(e.target.id.slice(4));
    console.log(id);
    if (e.target.innerText) return;

    if (this.state.counter % 2 === 0) {
      this.setState((currentState) => {
        return {
          board: [...currentState.board].map((boardBox, index) => {
            if (index + 1 === id) {
              return (boardBox = currentState.playerOne.icon);
            } else {
              return boardBox;
            }
          }),
          counter: currentState.counter + 1,
          turn: currentState.turn + 1,
        };
      });
    } else {
      this.setState((currentState) => {
        return {
          board: [...currentState.board].map((boardBox, index) => {
            if (index + 1 === id) {
              return (boardBox = currentState.playerTwo.icon);
            } else {
              return boardBox;
            }
          }),
          counter: currentState.counter + 1,
          turn: currentState.turn - 1,
        };
      });
    }
  };
  render() {
    const { board, winner, playerOne, playerTwo } = this.state;
    console.log([winner]);

    return (
      <section>
        <PlayerOne
          playerOne={playerOne}
          handleNameChange={this.handleNameChange}
          handleIconChange={this.handleIconChange}
          handleNameSubmit={this.handleNameSubmit}
        />
        <div className="board">
          <GridGenerator handleboardSize={this.handleboardSize} />
          <div className="board-Wrapper">
            {board.map((boardBox, index) => {
              return (
                <div
                  id={`box-${index + 1}`}
                  key={`box-${index + 1}`}
                  onClick={this.handleClick}
                  className={
                    boardBox === this.state[winner] ? `winner` : `none`
                  }
                >
                  {boardBox}
                </div>
              );
            })}
            {winner && <p>{winner} wins</p>}
            <button onClick={this.handleReset}>reset</button>
          </div>
        </div>
        <PlayerTwo
          playerTwo={playerTwo}
          handleNameChange={this.handleNameChange}
          handleIconChange={this.handleIconChange}
          handleNameSubmit={this.handleNameSubmit}
        />
      </section>
    );
  }
}

export default GameGrid;
