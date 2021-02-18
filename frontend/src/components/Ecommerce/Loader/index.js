import React from "react";

import "./Loader.css";
import loaderGif from "../../../assets/gifs/loader.gif";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <img src={loaderGif} alt="loader" />
    </div>
  );
};

export default Loader;
