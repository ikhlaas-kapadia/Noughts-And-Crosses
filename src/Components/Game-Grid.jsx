import React from "react";
import "../App.css";
class GameGrid extends React.Component {
  state = {
    grid: ["", "", ""],
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
        <div id="box-1" onClick={this.handleClick}></div>
        <div id="box-2" onClick={this.handleClick}></div>
        <div id="box-3" onClick={this.handleClick}></div>
        <div id="box-4" onClick={this.handleClick}></div>
        <div id="box-5" onClick={this.handleClick}></div>
        <div id="box-6" onClick={this.handleClick}></div>
        <div id="box-7" onClick={this.handleClick}></div>
        <div id="box-8" onClick={this.handleClick}></div>
        <div id="box-9" onClick={this.handleClick}></div>
      </div>
    );
  }
}

export default GameGrid;
