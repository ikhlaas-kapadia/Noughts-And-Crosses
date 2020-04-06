import React from "react";
import "../App.css";
class GameGrid extends React.Component {
  state = {
    grid: ["", "", "", "", "", "", "", "", ""],
    player1: "X",
    player2: "O",
    counter: 0,
    turn: 1,
  };
  handleClick = (e) => {
    let id = Number(e.target.id.slice(4));
    console.log(typeof id);

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
    const { grid, counter, turn, player1, player2 } = this.state;
    console.log(grid, counter, turn);

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
      </div>
    );
  }
}

export default GameGrid;
