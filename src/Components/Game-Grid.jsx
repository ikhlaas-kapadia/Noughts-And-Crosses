import React from "react";
import "../App.css";
import Player from "./Player";
import BoardSelector from "./BoardSelector";
class GameGrid extends React.Component {
  state = {
    boardSize: 9,
    board: ["", "", "", "", "", "", "", "", ""],
    player1: { name: "Player1", icon: "X", gamesWon: 0 },
    player2: { name: "Player2", icon: "O", gamesWon: 0 },
    player1Input: "",
    player2Input: "",
    counter: 0,
    winCombinations: [],
    winningPattern: [],
  };

  handleboardSize = (e) => {
    const { value } = e.target;
    const newboardSize = Math.pow(value, 2);
    if (value % 2 === 0) {
      return;
    } else {
      this.setState({
        boardSize: newboardSize,
        board: [...Array(newboardSize)],
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
    const { player1Input, player2Input } = this.state;
    e.preventDefault();
    const { name } = e.target;
    const playerInput = name === "player1" ? player1Input : player2Input;
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
  handleReset = (e) => {
    const { boardSize, rounds } = this.state;
    this.setState({
      board: [...Array(boardSize)],
      counter: 0,
      winner: undefined,
      rounds: rounds + 1,
      winningPattern: [],
    });
  };

  checkWinner = () => {
    const { winCombinations, board, player1, player2, counter } = this.state;
    const playerObject =
      counter % 2 === 0 || counter === 0 ? "player2" : "player1";
    const previousPlayer =
      counter % 2 === 0 || counter === 0 ? player2 : player1;
    let playerPositions = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === previousPlayer.icon) {
        playerPositions.push(i + 1);
      }
    }

    for (let i = 0; i < winCombinations.length; i++) {
      let winningMatchCounter = 0;
      for (let j = 0; j < winCombinations[i].length; j++) {
        // console.log(i);
        for (let k = 0; k < playerPositions.length; k++) {
          if (winCombinations[i][j] === playerPositions[k]) {
            winningMatchCounter++;
          }
        }
      }
      if (winningMatchCounter === winCombinations[i].length) {
        const updatedPlayer = { ...previousPlayer };
        updatedPlayer.gamesWon++;
        this.setState({
          winner: previousPlayer.name,
          [playerObject]: updatedPlayer,
          winningPattern: winCombinations[i],
        });
        return;
      }
    }
  };

  generateWinCombinations = () => {
    const { board } = this.state;
    const rowLength = Math.sqrt(board.length);
    let firstRow = [...Array(rowLength + 1).keys()].splice(1, rowLength);
    let winCombinations = [];
    let horzWins = [];
    let vertWins = [];
    let diagonalWins = [];
    let BoardSquares = board.map((el, index) => {
      el = index + 1;
      return el;
    });
    const generateHorizontalWins = () => {
      let lineWins = [];
      for (let i = 0; i <= BoardSquares.length; i++) {
        lineWins.push(BoardSquares[i]);
        if (BoardSquares[i] % rowLength === 0) {
          horzWins.push(lineWins);
          lineWins = [];
        }
      }
      // console.log(horzWins, " --->horizon");
      winCombinations.push(...horzWins);
    };

    const generateVerticalWins = () => {
      for (let i = 0; i < firstRow.length; i++) {
        let lineWins = [firstRow[i]];
        for (let j = 0; j < firstRow.length - 1; j++) {
          lineWins.push(lineWins[j] + firstRow.length);
        }
        vertWins.push(lineWins);
      }
      // console.log(vertWins, " --->vertical");
      winCombinations.push(...vertWins);
    };

    const generateDiagonalWins = () => {
      let firstRowFirstNumber = firstRow[0];
      let firstRowLastNumber = firstRow[firstRow.length - 1];
      let rowBaseToCalcWin = [firstRowFirstNumber, firstRowLastNumber];
      for (let i = 0; i < rowBaseToCalcWin.length; i++) {
        let lineWins = [rowBaseToCalcWin[i]];
        // console.log(lineWins);
        for (let j = 0; j < firstRow.length - 1; j++) {
          if (i === 0) {
            lineWins.push(lineWins[j] + firstRow.length + 1);
          } else {
            lineWins.push(lineWins[j] + firstRow.length - 1);
          }
        }
        diagonalWins.push(lineWins);
      }

      // console.log(diagonalWins, " --->diagonal");
      winCombinations.push(...diagonalWins);
    };
    generateHorizontalWins();
    generateVerticalWins();
    generateDiagonalWins();
    console.log(winCombinations);
    this.setState({ winCombinations: winCombinations });
  };

  componentDidMount() {
    this.generateWinCombinations();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.boardSize !== this.state.boardSize) {
      this.generateWinCombinations();
    }
    if (
      prevState.counter !== this.state.counter &&
      this.state.counter > Math.sqrt(this.state.boardSize)
    ) {
      this.checkWinner();
    }
  }

  handleClick = (e) => {
    const { winner } = this.state;
    if (winner !== undefined) {
      return;
    }
    let id = Number(e.target.id.slice(4));
    // console.log(id);
    if (e.target.innerText) return;

    if (this.state.counter % 2 === 0) {
      this.setState((currentState) => {
        return {
          board: [...currentState.board].map((boardBox, index) => {
            if (index + 1 === id) {
              return (boardBox = currentState.player1.icon);
            } else {
              return boardBox;
            }
          }),
          counter: currentState.counter + 1,
        };
      });
    } else {
      this.setState((currentState) => {
        return {
          board: [...currentState.board].map((boardBox, index) => {
            if (index + 1 === id) {
              return (boardBox = currentState.player2.icon);
            } else {
              return boardBox;
            }
          }),
          counter: currentState.counter + 1,
        };
      });
    }
  };
  render() {
    const {
      board,
      winner,
      player1,
      player2,
      boardSize,
      counter,
      winningPattern,
    } = this.state;
    console.log(winningPattern);
    return (
      <section>
        <div className="Player-Box">
          <Player
            player1={player1}
            handleNameChange={this.handleNameChange}
            handleIconChange={this.handleIconChange}
            handleNameSubmit={this.handleNameSubmit}
            counter={counter}
            winner={winner}
          />
          <div className="Turn-Box">
            {winner === undefined &&
            (counter % 2 === 0 || counter === 0) &&
            counter !== boardSize ? (
              <p className="Turn">Your Turn</p>
            ) : (
              <p className="No-Turn"></p>
            )}
          </div>
        </div>
        <div className="Board-Wrapper">
          <BoardSelector
            handleboardSize={this.handleboardSize}
            counter={counter}
          />
          <div className={`Board-${boardSize} Board`}>
            {board.map((boardBox, index) => {
              console.log(index + 1);
              return (
                <div
                  id={`box-${index + 1}`}
                  key={`box-${index + 1}`}
                  onClick={this.handleClick}
                  className={
                    winningPattern.find((element) => element === index + 1) !==
                    undefined
                      ? "Winner"
                      : "Box"
                  }
                >
                  <span className="Box-Content">{boardBox}</span>
                </div>
              );
            })}
          </div>
          <button className="Reset-Btn" onClick={this.handleReset}>
            Reset
          </button>
          {winner !== undefined && (
            <p className="Message">
              {winner.length === 0 ? "Unnamed" : winner.toUpperCase()} WINS!
            </p>
          )}
          {winner === undefined && counter === boardSize && (
            <p className="Message">Draw!</p>
          )}
          {counter === 0 && (
            <p className="Message">
              Optional-(change weapon once before starting round){" "}
            </p>
          )}
        </div>
        <div className="Player-Box">
          <Player
            player2={player2}
            handleNameChange={this.handleNameChange}
            handleIconChange={this.handleIconChange}
            handleNameSubmit={this.handleNameSubmit}
            counter={counter}
            winner={winner}
          />
          <div className="Turn-Box">
            {winner === undefined &&
            counter % 2 !== 0 &&
            counter !== boardSize ? (
              <p className="Turn">Your Turn</p>
            ) : (
              <p className="No-Turn"></p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default GameGrid;
