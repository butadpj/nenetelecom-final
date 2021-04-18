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
      <div className="circle"></div>
      <Header icon={storeIcon} text="OUR STORE" />
      <div className="cards">
        <Cards
          icon={moneyIcon}
          title="Same quality in better price"
          text="There's still full-warranty and better after-sales service for a better price"
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
          <Button type="button" text="SHOP ONLINE" />
        </Link>
      </div>
      <div className="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#E9E9E9"
            fillOpacity="1"
            d="M0,96L60,85.3C120,75,240,53,360,80C480,107,600,181,720,208C840,235,960,213,1080,202.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Store;
