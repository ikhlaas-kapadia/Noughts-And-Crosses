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
        <h2> {name} </h2>
        <span className="Icon">{!icon ? "X" : icon}</span>
      </div>
      <div className="Player-Details">
        <form className="NameForm" onSubmit={handleNameSubmit} name={player}>
          <label for={`${player}Input`}></label>
          <input
            className="Name-Input"
            onChange={handleNameChange}
            name={`${player}Input`}
            maxLength="10"
            placeholder="Type Here"
          ></input>
          <button>Change Name</button>
        </form>
        <div className="Weapon-Changer">
          <label for={`${player}`}></label>
          {/* <span>Weapon Change </span> */}
          <input
            className="Weapon-Input"
            onChange={handleIconChange}
            name={`${player}`}
            maxLength="3"
            placeholder="Type Weapon Here"
          ></input>
        </div>
      </div>
      <div className="Score-Container">
        <h3>SCORE</h3>
        <span className="Score">{gamesWon}</span>
      </div>
    </div>
  );
};

export default Player;
