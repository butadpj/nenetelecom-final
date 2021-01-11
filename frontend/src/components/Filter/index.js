import React from "react";

import "./Filter.css";

import FilterButton from "./FilterButton/";

const Filter = () => {
  return (
    <section className="filter">
      <div className="filter-btns">
        <FilterButton name="price" />
        <FilterButton name="category" />
        <FilterButton name="condition" />
        <FilterButton name="brand" />
      </div>
    </section>
  );
};

export default Filter;
