import React from "react";
import "./App.css";
import GameGrid from "./Components/Game-Grid";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Noughts and Crosses</h1>
      </header>
      <GameGrid />
    </div>
  );
}

export default App;
