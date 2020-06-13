import React from "react";

const GridSelector = (props) => {
  const { handleboardSize, counter } = props;
  return (
    <div className={counter === 0 ? "Grid-Selector" : "Hidden-Selector"}>
      <p>Please select your grid size</p>
      <select className="Drop-Down" onChange={handleboardSize}>
        <option>3</option>
        <option>5</option>
        <option>7</option>
        <option>9</option>
      </select>
    </div>
  );
};

export default GridSelector;
