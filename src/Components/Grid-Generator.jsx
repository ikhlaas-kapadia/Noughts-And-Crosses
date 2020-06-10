import React from "react";

const GridGenerator = (props) => {
  const { handleGridSize } = props;
  return (
    <div>
      <p>Please select your grid size</p>
      <select onChange={handleGridSize}>
        <option>3</option>
        <option>5</option>
        <option>7</option>
        <option>9</option>
      </select>
    </div>
  );
};

export default GridGenerator;
