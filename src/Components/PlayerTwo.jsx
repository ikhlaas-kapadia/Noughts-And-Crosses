import React from "react";

const PlayerTwo = (props) => {
  const { handleNameChange, handleIconChange, handleNameSubmit, input } = props;
  const { name, icon, gamesWon } = props.player2;

  return (
    <div className="Player">
      <h2>
        {name.toUpperCase()} <span className="Icon">{!icon ? "O" : icon}</span>
      </h2>
      <div className="NameForm">
        <form onSubmit={handleNameSubmit} name="player2">
          <label>
            <input
              onChange={handleNameChange}
              name="playerTwoInput"
              minLength="1"
            ></input>
          </label>
          <button>Change Name</button>
        </form>
        <p>Optional - Change Character </p>
        <input onChange={handleIconChange} name="player2" maxLength="2"></input>
        <div className="Score">
          <h3>SCORE</h3>
          {gamesWon}
        </div>
      </div>
    </div>
  );
};

export default PlayerTwo;
