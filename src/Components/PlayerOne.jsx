import React from "react";

const PlayerOne = (props) => {
  const {
    playerOneName,
    playerOneIcon,
    handleNameChange,
    handleIconChange,
  } = props;
  return (
    <div className="Player">
      <h2>
        {!playerOneName ? "Player 1" : playerOneName}{" "}
        <span className="Icon">{!playerOneIcon ? "X" : playerOneIcon}</span>
      </h2>
      <div className="NameForm">
        <input onChange={handleNameChange} name="playerOneName"></input>
        <p>Enter Your Weapon `(letter, number, emoticon)` </p>
        <input onChange={handleIconChange} name="playerOneIcon"></input>
        <div></div>
      </div>
    </div>
  );
};

export default PlayerOne;
