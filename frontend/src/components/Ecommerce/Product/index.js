import React, { useEffect, useContext } from "react";
import "./Product.css";

import defaultImage from "../../../assets/images/Default.png";
import Button from "../../Button";
import ProductLogic from "./ProductLogic";
import Loader from "../../../components/Ecommerce/Loader";
import ProductDetail from "./ProductDetail";
import { ProductContext } from "../../../context/ProductContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductResults from "../InfiniteScrollResults/ProductResults";

const Product = React.memo(() => {
  const {
    handleShowProductDetails,
    handleCloseProductDetails,
    highlightSearchMatch,
    showDetails,
    detailData,
  } = ProductLogic();

  const {
    productResults,
    loading,
    hasMore,
    offSet,
    limit,
    setHasMore,
    setOffSet,
    setLoading,
    setData,
    shuffle,
    isRefreshing,
    setIsRefreshing,
  } = ProductResults();

  let url = `/api/products/?limit=${limit}&offset=${offSet}`;

  const [productState] = useContext(ProductContext);
  let products = productState.products;
  let isLoading = productState.isLoading;
  let searchInput = productState.productSearchInput;
  let searchedProductList = productState.searchedProductList;
  let isSearching = productState.isSearching;

  let searchResult = []; // Matched search will go here
  // Product Search will happen here
  useEffect(() => {
    let input = searchInput.toLowerCase().replace(/\s+/g, " ").trim();
    products.filter((product) => {
      let name = product.name.toLowerCase().replace(/\s+/g, " ").trim();
      let brand = product.brand.toLowerCase().replace(/\s+/g, " ").trim();
      let condition = product.condition
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
      let price = `${Number(product.price).toLocaleString()}.00`;
      if (
        name.includes(input) ||
        brand.includes(input) ||
        condition.includes(input) ||
        price.includes(input)
      ) {
        highlightSearchMatch(input, ".product .product-name");
        highlightSearchMatch(input, ".product .condition");
        highlightSearchMatch(input, ".product .product-price .current");
        searchResult.push(product); // Push it to search result
      }
    });

    productState.searchedProductList = searchResult; // Put it on searchedProductList
  }, [searchInput]);

  useEffect(() => {
    if (isRefreshing) {
      setLoading(true);
      const refreshData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (!data.next) {
            setHasMore(false);
          }
          setData(shuffle([...productResults, ...data.results]));
          setLoading(false);
          setIsRefreshing(false);
          setOffSet((prev) => {
            return prev + limit;
          });
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      refreshData();
    }
  }, [isRefreshing]);

  useEffect(() => {
    document.body.style.overflow = "auto";
    loadNextData(url);
  }, []);

  const loadNextData = async (url) => {
    console.log("dadsa");
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.next) {
        setHasMore(false);
      }
      setData([...productResults, ...data.results]);
      setLoading(false);
      setOffSet((prev) => {
        return prev + limit;
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading || loading ? (
        <Loader />
      ) : // searchedProductList[] will be diplay if user is currently searching
      isSearching ? (
        // Check if there's any match for searched product, if none, display "Not found" text
        searchedProductList.length ? (
          searchedProductList.map((product) => {
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
              variation,
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
                        description,
                        variation
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
                          description,
                          variation
                        )
                      }
                    />
                  </div>
                </main>
              </div>
            );
          })
        ) : (
          <div className="not-found-text">
            <h5>Product not found, please try another keywords</h5>
            <p>
              Tip: You can also try searching for Phone's brand name, Condition,
              and price
            </p>
          </div>
        )
      ) : (
        // products[] will be diplay if user is not searching
        <InfiniteScroll
          dataLength={productResults.length}
          next={() => loadNextData(url)}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={
            <h4 className="scroll-message ">Yay! You've seen it all</h4>
          }
          pullDownToRefresh={true}
          pullDownToRefreshThreshold={80}
          refreshFunction={() => setIsRefreshing(true)}
          pullDownToRefreshContent={
            <div className="scroll-message pull-down-message">
              <i className="fas fa-arrow-circle-up"></i>
            </div>
          }
          releaseToRefreshContent={
            <h5 className="css-loader">
              <div id="css-ldr"></div>
            </h5>
          }
        >
          {productResults.map((product) => {
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
              variation,
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
                        description,
                        variation
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
                          description,
                          variation
                        )
                      }
                    />
                  </div>
                </main>
              </div>
            );
          })}
        </InfiniteScroll>
      )}
      {showDetails && (
        <ProductDetail
          detailData={detailData}
          handleCloseProductDetails={handleCloseProductDetails}
        />
      )}
    </>
  );
});

export default Product;
