import React from "react";

const GridGenerator = (props) => {
  const { handleboardSize } = props;
  return (
    <div>
      <p>Please select your grid size</p>
      <select onChange={handleboardSize}>
        <option>3</option>
        <option>5</option>
        <option>7</option>
        <option>9</option>
      </select>
    </div>
  );
};

export default GridGenerator;
