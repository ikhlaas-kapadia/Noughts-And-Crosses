import React from "react";

const PlayerOne = (props) => {
  const { handleNameChange, handleIconChange, handleNameSubmit, input } = props;
  const { name, icon, gamesWon } = props.player1;

  return (
    <div className="Player">
      <h2>
        {name.toUpperCase()} <span className="Icon">{!icon ? "X" : icon}</span>
      </h2>

      <form className="NameForm" onSubmit={handleNameSubmit} name="player1">
        <label>
          <input onChange={handleNameChange} name="playerOneInput"></input>
        </label>
        <button>Change Name</button>
      </form>
      <label>
        <input
          className="Icon-Changer"
          onChange={handleIconChange}
          name="player1"
          maxLength="2"
          minLength="1"
        ></input>
        diidsjijsddsjisdiidsjdsji
      </label>
      <p>Optional - Change Character </p>

      <div className="Score">
        {" "}
        <h3>SCORE</h3>
        {gamesWon}
      </div>
    </div>
  );
};

export default PlayerOne;
