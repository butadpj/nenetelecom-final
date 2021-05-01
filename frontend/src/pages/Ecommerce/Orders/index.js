import React from "react";

import "./Orders.css";
import OrdersLogic from "./OrdersLogic";
import Navbottom from "../../../components/Ecommerce/Navbars/Navbottom";
import BackTo from "../../../components/Ecommerce/BackTo";
import HelpText from "../../../components/Ecommerce/HelpText";

const Orders = () => {
  const { orders } = OrdersLogic();
  console.log(orders);

  return (
    <>
      <section className="orders-page">
        <div className="orders-top-nav">
          <BackTo
            linkText="to cart"
            link="/store/cart"
            icon={<i className="fas fa-shopping-cart"></i>}
          />
        </div>
        <hr />
        {orders.length === 0 ? (
          <HelpText text="You don't have any orders yet" />
        ) : null}
        <div className="orders-wrapper">
          {orders.map((order) => {
            const {
              transaction_id,
              date_placed,
              confirmed,
              paid,
              order_products,
              delivered,
              total_cart_price,
              total_cart_items,
            } = order;
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

            let f_total_price = `₱ ${Number(
              total_cart_price
            ).toLocaleString()}.00`;

            let d = new Date(date_placed);
            let mm = String(months[d.getMonth()]); //January is 0!
            let dd = String(d.getDate()).padStart(2, "0");
            let yyyy = String(d.getFullYear());
            let hr = String(d.getHours());
            let min = String(d.getMinutes()).padStart(2, "0");

            let ampm = "AM";
            if (hr > 12) {
              hr -= 12;
              ampm = "PM";
            }

            let date = `${mm} ${dd}, ${yyyy} at ${hr}:${min} ${ampm}`;
            return (
              <main className="order" key={transaction_id}>
                <section className="order-info">
                  <div className="info">
                    <div className="id">Order ID: {transaction_id}</div>
                    <div className="date-placed">Placed on {date}</div>
                    <div className="status">
                      {!confirmed ? (
                        <div className="confirmed-status">
                          <p style={{ color: "var(--shadeBlue)" }}>
                            Confirming order...
                          </p>
                        </div>
                      ) : null}

                      {confirmed ? (
                        <div className="paid-status">
                          {paid ? (
                            <p style={{ color: "var(--shadeGreen)" }}>Paid</p>
                          ) : (
                            <p style={{ color: "var(--shadeLightBlue)" }}>
                              To pay...
                            </p>
                          )}
                        </div>
                      ) : null}
                      <div className="payment-method">COD</div>
                    </div>
                  </div>
                </section>
                <section className="order-products">
                  {order_products.map((item) => {
                    const { product, variation_price } = item;
                    let f_price = `₱ ${Number(
                      variation_price ? variation_price : product.price
                    ).toLocaleString()}.00`;

                    // Handle Error
                    if (!product) {
                      return (
                        <div className="order-product" key={order}>
                          <h2 style={{ color: "var(--shadeRed)" }}>
                            Product-deleted
                          </h2>
                        </div>
                      );
                    }
                    return (
                      <div className="order-product" key={product.id}>
                        <img
                          src={product.images[0]}
                          alt=""
                          className="order-product-image"
                          width="90"
                        />
                        <div className="order-product-info">
                          <p className="product-name">{product.name}</p>
                          <p className="product-price">{f_price}</p>
                          <p className="product-quantity">x{item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </section>
                <section className="bottom-info">
                  {confirmed ? (
                    <div className="delivery-status">
                      {!delivered ? (
                        "On the way..."
                      ) : (
                        <p style={{ color: "var(--shadeBlue)" }}>Delivered</p>
                      )}
                    </div>
                  ) : null}
                  <div className="order-summary">
                    <main>
                      <p className="total-items">{total_cart_items} item/s</p>
                      <p className="total-price">{f_total_price}</p>
                    </main>
                  </div>
                </section>
              </main>
            );
          })}
        </div>
      </section>
      <Navbottom />
    </>
  );
};

export default Orders;
