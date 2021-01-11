import React from "react";
import downBtn from "../../../assets/svgs/caret-down-solid.svg";

import "./FilterButton.css";

const FilterButton = ({ name }) => {
  return (
    <div className={[name + " filter-btn"]}>
      <p>{name}</p>
      <img src={downBtn} alt="" />
    </div>
  );
};

export default FilterButton;
