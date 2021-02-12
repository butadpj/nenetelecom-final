import React, { useEffect } from "react";

import "./Home.css";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import Product from "../../../components/Ecommerce/Product";
import { updateCart } from "../../../hooks/updateCart";

const Home = () => {
  const { update } = updateCart();
  update();

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
