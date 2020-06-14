import React from "react";

const PlayerTwo = (props) => {
  const {
    handleNameChange,
    handleIconChange,
    handleNameSubmit,
    counter,
    winner,
  } = props;
  const { name, icon, gamesWon } = props.player2;
  return (
    <div className="Player">
      <h2>
        {name.toUpperCase()} <span className="Icon">{!icon ? "O" : icon}</span>
      </h2>
      <form className="NameForm" onSubmit={handleNameSubmit} name="player2">
        <label>
          <input
            onChange={handleNameChange}
            name="playerTwoInput"
            maxLength="10"
          ></input>
        </label>
        <button>Change Name</button>
      </form>
      <label>
        <input
          className="Icon-Changer"
          onChange={handleIconChange}
          name="player2"
          maxLength="3"
          placeholder="Weapon"
        ></input>
      </label>
      <div className="Score">
        <h3>SCORE</h3>
        <span>{gamesWon}</span>
      </div>

      {winner === undefined && (counter % 2 !== 0 || counter === 1) ? (
        <p className="Turn">Your Turn</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default PlayerTwo;
