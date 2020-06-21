import React from "react";

const Player = (props) => {
  const {
    handleInputChange,
    handleNameSubmit,
    handleIconSubmit,
    counter,
    winner,
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
            onChange={handleInputChange}
            name={`${player}Input`}
            maxLength="10"
            placeholder="Type Here"
          ></input>
          <button className="Change-Button">Change Name</button>
        </form>
        <form
          className="Weapon-Changer"
          onSubmit={handleIconSubmit}
          name={player}
        >
          <label for={`${player}`}></label>
          {/* <span>Weapon Change </span> */}
          <input
            className="Weapon-Input"
            onChange={handleInputChange}
            name={`${player}Icon`}
            minLength="1"
            maxLength="2"
            placeholder="Type Weapon"
          />
          <button className="Change-Button">Change Weapon</button>
        </form>
      </div>
      <div className="Score-Container">
        <h3>SCORE</h3>
        <span className="Score">{gamesWon}</span>
      </div>
    </div>
  );
};

export default Player;
