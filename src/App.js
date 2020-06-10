import React from "react";
import "./App.css";
import GameGrid from "./Components/Game-Grid";
import GridGenerator from "./Components/Grid-Generator";


function App() {
  return (
    <div className="App">
      <header>
        <h1>Noughts and Crosses</h1>
      </header>
      <section>
        <GameGrid />
      </section>
    </div>
  );
}

export default App;
