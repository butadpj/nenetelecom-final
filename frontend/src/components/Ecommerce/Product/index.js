import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Product.css";

import defaultImage from "../../../assets/images/Default.png";
import Button from "../../Button";
import ProductLogic from "./ProductLogic";
import ImageSlider from "../ImageSlider";
import closeIcon from "../../../assets/svgs/close.svg";
import Loader from "../../../components/Ecommerce/Loader";

const Product = () => {
  const {
    handleShow,
    products,
    showDetails,
    handleClose,
    detailData,
    handleShowAddProductModal,
    handleCloseAddProductModal,
    showAddProductModal,
    productLoading,
    productImageLoading,
  } = ProductLogic();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      {productLoading && productImageLoading ? (
        <Loader />
      ) : (
        products.map((product) => {
          const {
            id,
            image,
            category,
            brand,
            name,
            price,
            description,
            date_posted,
          } = product;

          let f_price = Number(price).toLocaleString();

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

          let d = new Date(date_posted);
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
            <div key={id}>
              <main className="product">
                <div className="condition brand-new">Brand new</div>
                <div className="info-top">
                  <div className="product-name">{name}</div>
                  <div className="date-posted">{date}</div>
                </div>
                <img
                  className="product-image"
                  src={image[0] || defaultImage}
                  alt="product-image"
                />
                <div className="info-bottom">
                  <div className="product-price">
                    <div className="current">₱ {f_price}.00</div>
                    {/* <div className="original">Php 49,000</div> */}
                  </div>
                  <Button
                    type="button"
                    text={
                      <div className="inner">
                        <p>Details</p>
                        <i className="fas fa-eye"></i>
                      </div>
                    }
                    cName="detail-btn"
                    functionality={() =>
                      handleShow(id, name, price, brand, image, description)
                    }
                  />
                </div>
              </main>
            </div>
          );
        })
      )}

      {showDetails && (
        <div className="modal-wrapper">
          <section className="product-view">
            <div className="detail-header">
              <h5 className="detail-product-name">{detailData.name}</h5>
              <div className="sub-details">
                <div className="detail-price">₱ {detailData.price}.00</div>
                <div className="detail-brand">
                  Brand: <span>{detailData.brand}</span>
                </div>
              </div>
            </div>
            <ImageSlider
              images={detailData.image}
              image_default={defaultImage}
            />
            <div className="detail-description">
              <p>{detailData.description || "*no description*"}</p>
            </div>
            <div className="detail-action">
              <div className="close" onClick={() => handleClose()}>
                <i className="fas fa-arrow-circle-left"></i>
              </div>
              <Button
                type="button"
                cName="add-btn"
                text={
                  <div>
                    Add <i className="fas fa-shopping-cart"></i>
                  </div>
                }
                functionality={() =>
                  handleShowAddProductModal(
                    detailData.id,
                    detailData.price,
                    "add"
                  )
                }
              />
            </div>
          </section>
        </div>
      )}
      {showAddProductModal && (
        <div className="modal-wrapper">
          <section className="add-product-modal">
            <h4 className="modal-text">
              <p>Added to cart </p>
              <i className="fas fa-check"></i>
            </h4>
            <Link to="/store/cart">
              <Button
                type="button"
                cName="modal-go-cart-button"
                text={
                  <div>
                    Go to cart <i className="fas fa-shopping-cart"></i>
                  </div>
                }
                functionality={() => handleCloseAddProductModal()}
              />
            </Link>

            <div className="modal-close-button">
              <img
                src={closeIcon}
                alt=""
                onClick={() => handleCloseAddProductModal()}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Product;
