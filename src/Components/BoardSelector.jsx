import React from "react";

const BoardSelector = (props) => {
  const { handleboardSize, counter } = props;
  return (
    <div className={counter === 0 ? "Board-Selector" : "Hidden-Selector"}>
      <label htmlFor="Drop-Down">Select board size: </label>
      <select className="Drop-Down" onChange={handleboardSize} name="Drop-Down">
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
      </select>
    </div>
  );
};

export default BoardSelector;
