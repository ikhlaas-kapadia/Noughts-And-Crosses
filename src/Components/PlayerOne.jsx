import React from "react";

const PlayerOne = (props) => {
  const { handleNameChange, handleIconChange, handleNameSubmit, input } = props;
  const { name, icon, gamesWon } = props.player1;

  return (
    <div className="Player">
      <h2>
        {name.toUpperCase()} <span className="Icon">{!icon ? "X" : icon}</span>
      </h2>
      <div className="NameForm">
        <form onSubmit={handleNameSubmit} name="player1">
          <label>
            <input onChange={handleNameChange} name="playerOneInput"></input>
          </label>
          <button>Change Name</button>
        </form>
        <p>`(Optional - Select Character)` </p>
        <input onChange={handleIconChange} name="player1" maxLength="2"></input>
        <div className="Score">
          {" "}
          <h3>SCORE</h3>
          {gamesWon}
        </div>
      </div>
    </div>
  );
};

export default PlayerOne;
