import React from "react";

import "./FilterButton.css";

const FilterButton = ({ name, icon }) => {
  return (
    <div className={[name + " filter-btn"]}>
      <p>{name}</p>
      <img src={icon} alt="" />
    </div>
  );
};

export default FilterButton;
