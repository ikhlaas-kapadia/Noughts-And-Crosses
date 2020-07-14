import React from "react";
import "../App.css";
import Player from "./Player";
import BoardSelector from "./BoardSelector";
import BotButton from "./Bot-Button";
class GameGrid extends React.Component {
  state = {
    boardSize: 9,
    board: ["", "", "", "", "", "", "", "", ""],
    player1: { name: "Player1", icon: "X", gamesWon: 0 },
    player2: { name: "Player2", icon: "O", gamesWon: 0 },
    player1Input: "",
    player2Input: "",
    player1Icon: "",
    player2Icon: "",
    counter: 0,
    winCombinations: [],
    winningPattern: [],
    bot: undefined,
  };

  handleboardSize = (e) => {
    const { value } = e.target;
    const newboardSize = Math.pow(value, 2);
    this.setState({
      boardSize: newboardSize,
      board: [...Array(newboardSize)],
    });
  };

  handleBot = (e) => {
    const { name } = e.target;
    if (name === "Bot") {
      this.setState({ bot: true });
    } else {
      this.setState({ bot: false });
    }
  };

  handleInputChange = (e) => {
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
    const updatedPlayer = { ...this.state[name] };
    updatedPlayer.name = playerInput;
    this.setState({
      [name]: updatedPlayer,
      [`${name}Input`]: updatedPlayer.name,
    });
  };

  handleIconSubmit = (e) => {
    const { player1Icon, player2Icon } = this.state;
    e.preventDefault();
    const { name } = e.target;
    const playerInput = name === "player1" ? player1Icon : player2Icon;
    const updatedPlayer = { ...this.state[name] };
    updatedPlayer.icon = playerInput;
    this.setState({ [name]: updatedPlayer, [`${name}Icon`]: "" });
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
    const {
      winCombinations,
      board,
      player1,
      player2,
      counter,
      winner,
    } = this.state;
    if (winner) return;
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
      winCombinations.push(...vertWins);
    };

    const generateDiagonalWins = () => {
      let firstRowFirstNumber = firstRow[0];
      let firstRowLastNumber = firstRow[firstRow.length - 1];
      let rowBaseToCalcWin = [firstRowFirstNumber, firstRowLastNumber];
      for (let i = 0; i < rowBaseToCalcWin.length; i++) {
        let lineWins = [rowBaseToCalcWin[i]];
        for (let j = 0; j < firstRow.length - 1; j++) {
          if (i === 0) {
            lineWins.push(lineWins[j] + firstRow.length + 1);
          } else {
            lineWins.push(lineWins[j] + firstRow.length - 1);
          }
        }
        diagonalWins.push(lineWins);
      }
      winCombinations.push(...diagonalWins);
    };
    generateHorizontalWins();
    generateVerticalWins();
    generateDiagonalWins();
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
    if (prevState.counter !== this.state.counter && this.state.bot) {
      this.botClick();
    }
  }
  botClick = () => {
    const { board, counter, player2, bot } = this.state;

    if (counter % 2 !== 0 && bot) {
      let emptyBoxPosition;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === undefined || board[i] === "") {
          emptyBoxPosition = i;
          break;
        }
      }
      setTimeout(() => {
        this.setState((currentState) => {
          return {
            board: currentState.board.map((boardBox, index) => {
              if (index === emptyBoxPosition) {
                const newBoardBox = player2.icon;
                return newBoardBox;
              } else {
                return boardBox;
              }
            }),
            counter: currentState.counter + 1,
          };
        });
      }, 150);
    }
  };

  handleClick = (e) => {
    const { winner, bot } = this.state;
    if (winner !== undefined) {
      return;
    }
    let id = Number(e.target.id.slice(4));
    if (e.target.innerText) return;
    if (bot) {
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
    }
    if (this.state.counter % 2 === 0 && !bot) {
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
    } else if (this.state.counter % 2 !== 0 && !bot) {
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
      bot,
    } = this.state;
    return (
      <section>
        <div className="Player-Box">
          <Player
            player1={player1}
            handleInputChange={this.handleInputChange}
            handleIconSubmit={this.handleIconSubmit}
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
              <p className="No-Turn">Your Turn</p>
            )}
          </div>
        </div>
        <BotButton handleBot={this.handleBot} bot={bot} counter={counter} />
        <div className="Middle-Wrapper">
          <BoardSelector
            handleboardSize={this.handleboardSize}
            counter={counter}
          />
          <div className="Board-Wrapper">
            <div className={`Board-${boardSize} Board`}>
              {board.map((boardBox, index) => {
                return (
                  <div
                    id={`box-${index + 1}`}
                    key={`box-${index + 1}`}
                    onClick={this.handleClick}
                    className={
                      winningPattern.find(
                        (element) => element === index + 1
                      ) !== undefined
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
          </div>

          <div className="Message-Box">
            {winner !== undefined && (
              <p className="Message Win-Message">
                {winner.length === 0 ? "Unnamed" : winner} WINS!
              </p>
            )}
            {winner === undefined && counter === boardSize && (
              <p className="Message Win-Message">Draw!</p>
            )}
            {counter === 0 && (
              <p className={counter === 0 ? "Message " : "No-Message"}>
                Optional-(change weapon once before starting round).<br></br>
                Start game by clicking any board box.
              </p>
            )}
          </div>
        </div>
        <div className="Player-Box">
          <Player
            player2={player2}
            handleInputChange={this.handleInputChange}
            handleNameSubmit={this.handleNameSubmit}
            handleIconSubmit={this.handleIconSubmit}
            counter={counter}
            winner={winner}
          />
          <div className="Turn-Box">
            {winner === undefined &&
            counter % 2 !== 0 &&
            counter !== boardSize ? (
              <p className="Turn">Your Turn</p>
            ) : (
              <p className="No-Turn">Your Turn</p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default GameGrid;
