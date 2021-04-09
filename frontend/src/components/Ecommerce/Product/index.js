import React, { useEffect } from "react";
import "./Product.css";

import defaultImage from "../../../assets/images/Default.png";
import Button from "../../Button";
import ProductLogic from "./ProductLogic";
import Loader from "../../../components/Ecommerce/Loader";
import ProductDetail from "./ProductDetail";

const Product = () => {
  const {
    handleShowProductDetails,
    handleCloseProductDetails,
    products,
    isLoading,
    showDetails,
    detailData,
    searchInput,
  } = ProductLogic();

  const highlightSearchMatch = (input, queryClassname) => {
    document.querySelectorAll(`${queryClassname}`).forEach((element) => {
      let result = element.textContent.replace(
        new RegExp(input, "gi"),
        (match) => `<mark>${match}</mark>`
      );
      element.innerHTML = result;
    });
  };

  // const { searchInput, handleSearchInput } = SearchProductFormLogic();

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        products
          // Search filter
          .filter((product) => {
            let input = searchInput.toLowerCase().replace(/\s+/g, " ").trim();
            let name = product.name.toLowerCase().replace(/\s+/g, " ").trim();
            let brand = product.brand.toLowerCase().replace(/\s+/g, " ").trim();
            let condition = product.condition
              .toLowerCase()
              .replace(/\s+/g, " ")
              .trim();
            let price = `${Number(product.price).toLocaleString()}.00`;

            if (!searchInput) {
              return product;
            }
            if (
              name.includes(input) ||
              brand.includes(input) ||
              condition.includes(input) ||
              price.includes(input)
            ) {
              highlightSearchMatch(input, ".product .product-name");
              highlightSearchMatch(input, ".product .condition");
              highlightSearchMatch(input, ".product .product-price .current");
              return product;
            }
          })
          .map((product) => {
            const {
              id,
              image,
              category,
              condition,
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
                  <div
                    className={
                      condition == "Brand new"
                        ? "condition brand-new"
                        : "condition used"
                    }
                  >
                    {condition}
                  </div>
                  <div className="info-top">
                    <div className="product-name">{name}</div>
                    <div className="date-posted">{date}</div>
                  </div>
                  <img
                    className="product-image"
                    src={image[0] || defaultImage}
                    alt="product-image"
                    onClick={() =>
                      handleShowProductDetails(
                        id,
                        name,
                        price,
                        brand,
                        image,
                        description
                      )
                    }
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
                        handleShowProductDetails(
                          id,
                          name,
                          price,
                          brand,
                          image,
                          description
                        )
                      }
                    />
                  </div>
                </main>
              </div>
            );
          })
      )}
      {showDetails && (
        <ProductDetail
          detailData={detailData}
          handleCloseProductDetails={handleCloseProductDetails}
        />
      )}
    </>
  );
};

export default Product;
