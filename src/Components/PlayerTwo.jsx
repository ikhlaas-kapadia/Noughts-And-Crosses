import React from "react";

const PlayerTwo = (props) => {
  const {
    playerTwoName,
    playerTwoIcon,
    handleNameChange,
    handleIconChange,
  } = props;
  return (
    <div className="Player">
      <h2>
        {!playerTwoName ? "Player 2" : playerTwoName}{" "}
        <span className="Icon">{!playerTwoIcon ? "O" : playerTwoIcon}</span>
      </h2>
      <div className="NameForm">
        <input onChange={handleNameChange} name="playerTwoName"></input>
        <p>Enter Your Weapon `(letter, number, emoticon)` </p>
        <input onChange={handleIconChange} name="playerTwoIcon"></input>
        <div></div>
      </div>
    </div>
  );
};

export default PlayerTwo;
