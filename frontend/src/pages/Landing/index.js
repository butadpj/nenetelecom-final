import React from "react";

import Home from "./Home/";
import Store from "./Store/";
import Technicians from "./Technicians";
import About from "./About";
import Contact from "./Contact";

const Landing = () => {
  return (
    <>
      <Home />
      <Store />
      <Technicians />
      <About />
      <Contact />
    </>
  );
};

export default Landing;
