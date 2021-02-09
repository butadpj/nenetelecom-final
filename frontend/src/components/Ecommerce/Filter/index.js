import React from "react";

import "./Filter.css";
import downBtn from "../../../assets/svgs/caret-down-solid.svg";
import FilterButton from "./FilterButton";

const Filter = () => {
  return (
    <section className="filter">
      <div className="filter-btns">
        <FilterButton name="price" icon={downBtn} />
        <FilterButton name="category" icon={downBtn} />
        <FilterButton name="condition" icon={downBtn} />
        <FilterButton name="brand" icon={downBtn} />
      </div>
    </section>
  );
};

export default Filter;
