import React from "react";

import "./Orders.css";
import OrdersLogic from "./OrdersLogic";
import { Link } from "react-router-dom";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
const Orders = () => {
  const { orders } = OrdersLogic();
  console.log(orders);
  return (
    <>
      <section className="orders">
        <div className="orders-top-nav">
          <div className="back-to-cart">
            <Link to="/store/cart">
              <i className="fas fa-arrow-circle-left"></i>
            </Link>
            <span>
              to cart <i className="fas fa-shopping-cart"></i>
            </span>
          </div>
        </div>
        <hr />
        <div className="orders-wrapper">
          {orders.map((order) => {
            const { transaction_id, date_placed, paid, order_products } = order;

            let months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];

            let d = new Date(date_placed);
            let mm = String(months[d.getMonth()]); //January is 0!
            let dd = String(d.getDate()).padStart(2, "0");
            let yyyy = String(d.getFullYear());
            let hr = String(d.getHours());
            let min = String(d.getMinutes());

            let ampm = "AM";
            if (hr > 12) {
              hr -= 12;
              ampm = "PM";
            }

            let date = `${mm} ${dd}, ${yyyy} at ${hr}:${min} ${ampm}`;
            return (
              <div className="order" key={transaction_id}>
                <div className="order-info">
                  <div className="id">Order ID: {transaction_id}</div>
                  <div className="date-placed">Placed on {date}</div>
                  <div className="date-paid">February 23, 2021 at 7:56 PM</div>
                  <div className="status">{paid ? "paid" : "To pay..."}</div>
                </div>
                <div className="order-products">
                  {order_products.map((item) => {
                    const { product } = item;
                    if (!product) {
                      return (
                        <div className="product" key={order}>
                          <h2 style={{ color: "var(--shadeRed)" }}>
                            Product-deleted
                          </h2>
                        </div>
                      );
                    }
                    return (
                      <div className="product" key={product.id}>
                        <h2>{product.id}</h2>
                        <img src={product.image[0]} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Navbottom />
    </>
  );
};

export default Orders;
