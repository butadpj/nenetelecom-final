import React, { useContext } from "react";
import { ProductContext } from "../../../context/ProductContext";

import "./SearchProductForm.css";

const SearchProductForm = () => {
  const [state, dispatch] = useContext(ProductContext);

  return (
    <div className="search-form">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Search for a product..."
        value={state.productSearchInput}
        onChange={(event) =>
          dispatch({ type: "SEARCH_PRODUCT", payload: event.target.value })
        }
      />
    </div>
  );
};

export default SearchProductForm;
