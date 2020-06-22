import React from "react";

const BotButton = (props) => {
  const { handleBot, bot } = props;
  return (
    <div className={bot === undefined ? "Mode-Btns" : "Mode-Btns-Hidden"}>
      <button onClick={handleBot} name="Bot">
        You VS Bot
      </button>
      <button onClick={handleBot} name="Someone">
        You VS Someone
      </button>
      <p>Refresh page after starting game if you wish to change mode</p>
    </div>
  );
};

export default BotButton;
