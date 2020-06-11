import React from "react";

const PlayerTwo = (props) => {
  const { handleNameChange, handleIconChange, handleNameSubmit, input } = props;
  const { name, icon } = props.playerTwo;

  return (
    <div className="Player">
      <h2>
        {!name ? "Player 2" : name}{" "}
        <span className="Icon">{!icon ? "O" : icon}</span>
      </h2>
      <div className="NameForm">
        <form onSubmit={handleNameSubmit} name="playerTwo">
          <label>
            <input onChange={handleNameChange} name="playerTwoInput"></input>
          </label>
          <button>Change Name</button>
        </form>
        <p>Enter Your Weapon `(letter, number, emoticon)` </p>
        <input onChange={handleIconChange} name="playerTwo"></input>
        <div></div>
      </div>
    </div>
  );
};

export default PlayerTwo;
