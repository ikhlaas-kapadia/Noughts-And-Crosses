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
      <div className="Player-Heading">
        <h2>
          {name} <span className="Icon">{!icon ? "X" : icon}</span>
        </h2>
      </div>
      <div className="Player-Details">
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
        <div className="Weapon-Changer">
          <label>
            <span>Weapon: </span>
            <input
              className="Weapon-Input"
              onChange={handleIconChange}
              name="player1"
              maxLength="3"
              placeholder="Type Here"
            ></input>
          </label>
        </div>
      </div>

      <div className="Score-Container">
        <h3>SCORE</h3>
        <span className="Score">{gamesWon}</span>
      </div>
      <div className="Turn-Box">
        {winner === undefined && (counter % 2 === 0 || counter === 0) ? (
          <p className="Turn">Your Turn</p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default PlayerOne;
