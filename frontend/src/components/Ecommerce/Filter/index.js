import React, { useContext, useState } from "react";

import "./Filter.css";
import downBtn from "../../../assets/svgs/caret-down-solid.svg";
import FilterButton from "./FilterButton";
import { ProductContext } from "../../../context/ProductContext";

const Filter = () => {
  const [productState, productDispatch] = useContext(ProductContext);
  const [filterValue, setFilterValue] = useState("");

  const applyFilter = (value) => {
    // setFilterValue(value);
    // productDispatch({
    //   type: "APPLY_FILTER",
    //   payload: { input: filterValue },
    // });
  };
  return (
    <section className="filter">
      <div className="filter-btns">
        <FilterButton name="price" icon={downBtn} />
        <FilterButton name="category" icon={downBtn} />
        <FilterButton name="condition" icon={downBtn} />
        <FilterButton
          name="brand"
          icon={downBtn}
          functionality={() => applyFilter("Oppo")}
        />
      </div>
    </section>
  );
};

export default Filter;
