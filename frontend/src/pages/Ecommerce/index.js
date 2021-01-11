import React, { useRef } from "react";

import "./Ecommerce.css";

import navLogo from "../../assets/images/Initials-dark-store@2x.webp";
import { Link } from "react-scroll";

import User from "../../components/User/";
import Filter from "../../components/Filter/";

const Store = () => {
  return (
    <main className="ecommerce">
      <header className="nav-top">
        <section className="banner">
          <img className="banner-logo" src={navLogo} alt="" />
          <User
            userName="Paul John"
            userImage="https://scontent.fmnl17-2.fna.fbcdn.net/v/t1.0-9/123952922_2792321897716939_3802288000402380068_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=qfkEVbJ2mwQAX_RjqOh&_nc_ht=scontent.fmnl17-2.fna&oh=cb69546125344534c1c3ae8edd0576d2&oe=6020A2FA"
          />
        </section>

        <Filter />
      </header>
    </main>
  );
};

export default Store;
