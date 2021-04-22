import React from "react";

import "./FilterButton.css";

const FilterButton = ({ name, icon, functionality }) => {
  return (
    <div className={[name + " filter-btn"]} onClick={functionality}>
      <p>{name}</p>
      <img src={icon} alt="" />
    </div>
  );
};

export default FilterButton;
