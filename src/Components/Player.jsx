import React from "react";

const Player = (props) => {
  const {
    handleNameChange,
    handleIconChange,
    handleNameSubmit,
    winner,
    counter,
  } = props;

  const player = props.player1 ? "player1" : "player2";
  const { name, icon, gamesWon } = props[player];

  return (
    <div className="Player">
      <div className="Player-Heading">
        <h2>
          {name} <span className="Icon">{!icon ? "X" : icon}</span>
        </h2>
      </div>
      <div className="Player-Details">
        <form className="NameForm" onSubmit={handleNameSubmit} name={player}>
          <label>
            <input
              onChange={handleNameChange}
              name={`${player}Input`}
              maxLength="10"
            ></input>
          </label>
          <button>Change Name</button>
        </form>
        <div className="Weapon-Changer">
          <label>
            <span>Weapon Change </span>
            <input
              className="Weapon-Input"
              onChange={handleIconChange}
              name={`${player}`}
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
          <p className="No-Turn"></p>
        )}
      </div>
    </div>
  );
};

export default Player;
