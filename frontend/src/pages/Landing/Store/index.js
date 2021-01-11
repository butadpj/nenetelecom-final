import React from "react";
import "./Store.css";
import storeIcon from "../../../assets/svgs/store-alt-solid.svg";
import moneyIcon from "../../../assets/svgs/money-bill-alt-regular.svg";
import truckIcon from "../../../assets/svgs/shipping-fast-solid.svg";
import smileIcon from "../../../assets/svgs/smile-beam-regular.svg";
import Header from "../../../components/Header/";
import Cards from "../../../components/Card/";
import Button from "../../../components/Button/";
import { Link } from "react-router-dom";

const Store = () => {
  return (
    <section className="store" id="store">
      <Header icon={storeIcon} text="OUR STORE" />
      <div className="cards">
        <Cards
          icon={moneyIcon}
          title="Lower price but same quality"
          text="There's still full-warranty and better after-sales service for a cheaper price"
        />
        <Cards
          icon={truckIcon}
          title="Same-day delivery"
          text="Get your phone the same day you order it"
        />
        <Cards
          icon={smileIcon}
          title="100% Satisfaction guarantee"
          text="We are ready to return your money if you're not satisfied with your item"
        />
      </div>
      <div className="storeBtn">
        <Link to="/store">
          <Button type="button" text="GO TO STORE" />
        </Link>
      </div>
    </section>
  );
};

export default Store;
