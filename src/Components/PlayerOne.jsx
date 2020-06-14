import React from "react";

const PlayerOne = (props) => {
  const {
    handleNameChange,
    handleIconChange,
    handleNameSubmit,
    winner,
    counter,
  } = props;
  const { name, icon, gamesWon } = props.player1;

  return (
    <div className="Player">
      <h2>
        {name.toUpperCase()} <span className="Icon">{!icon ? "X" : icon}</span>
      </h2>
      <form className="NameForm" onSubmit={handleNameSubmit} name="player1">
        <label>
          <input
            onChange={handleNameChange}
            name="playerOneInput"
            maxLength="10"
          ></input>
        </label>
        <button>Change Name</button>
      </form>
      <label>
        <input
          className="Icon-Changer"
          onChange={handleIconChange}
          name="player1"
          maxLength="3"
          placeholder="Weapon"
        ></input>
      </label>
      <div className="Score">
        {" "}
        <h3>SCORE</h3>
        <span>{gamesWon}</span>
      </div>
      {winner === undefined && (counter % 2 === 0 || counter === 0) ? (
        <p className="Turn">Your Turn</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default PlayerOne;
