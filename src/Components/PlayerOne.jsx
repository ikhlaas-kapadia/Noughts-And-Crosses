import React from "react";

const PlayerOne = (props) => {
  const { handleNameChange, handleIconChange, handleNameSubmit, input } = props;
  const { name, icon } = props.playerOne;

  return (
    <div className="Player">
      <h2>
        {!name ? "Player 1" : name}{" "}
        <span className="Icon">{!icon ? "X" : icon}</span>
      </h2>
      <div className="NameForm">
        <form onSubmit={handleNameSubmit} name="playerOne">
          <label>
            <input onChange={handleNameChange} name="playerOneInput"></input>
          </label>
          <button>Change Name</button>
        </form>
        <p>Enter Your Weapon `(letter, number, emoticon)` </p>
        <input onChange={handleIconChange} name="playerOne"></input>
        <div></div>
      </div>
    </div>
  );
};

export default PlayerOne;
