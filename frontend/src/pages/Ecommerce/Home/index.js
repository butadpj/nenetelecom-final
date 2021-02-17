import React, { useContext } from "react";

import "./Home.css";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import Product from "../../../components/Ecommerce/Product";

const Home = () => {
  return (
    <>
      <section className="products">
        <Product />
      </section>
      <Navbottom />
    </>
  );
};

export default Home;
