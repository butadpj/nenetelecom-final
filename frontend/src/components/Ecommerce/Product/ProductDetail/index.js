import React, { useRef } from "react";
import "./ProductDetail.css";
import defaultImage from "../../../../assets/images/Default.png";
import Button from "../../../Button";
import ModalWrapper from "../../../../components/Ecommerce/ModalWrapper";
import ImageSlider from "../../ImageSlider";
import ProductDetailLogic from "./ProductDetailLogic";
import AddProductModal from "../AddProductModal";

const ProductDetail = ({ detailData, handleCloseProductDetails }) => {
  const { id, name, price, brand, image, description, variation } = detailData;
  let storageSizeOption = variation.filter(
    (option) => option.category == "Storage Size"
  );
  const options = useRef(null);

  const {
    showAddProductModal,
    handleShowAddProductModal,
    handleCloseAddProductModal,
    selectedStorageVariation,
    selectedColorVariation,
    handleSelectedStorageVariation,
    handleSelectedColorVariation,
    variationPrice,
  } = ProductDetailLogic(options.current);

  let f_price = `₱ ${Number(variationPrice).toLocaleString()}.00`;

  return (
    <>
      <ModalWrapper>
        <main className="product-view product-view-show">
          <section className="detail-header">
            <h5 className="detail-product-name">{name}</h5>
            <div className="sub-details">
              <div className="detail-price">
                ₱ {Number(price).toLocaleString()}.00
              </div>
              <div className="detail-brand">
                Brand: <span>{brand}</span>
              </div>
            </div>
          </section>
          <section className="detail-variation">
            {variation.length ? (
              storageSizeOption.length ? (
                <div className="category storage-size">
                  <span className="category-name">Storage Size: </span>
                  <span className="variation-value">
                    {selectedStorageVariation ? (
                      <>
                        <span className="variation-name">
                          {selectedStorageVariation} {"> "}
                        </span>
                        <span className="variation-price">{f_price}</span>
                      </>
                    ) : (
                      <span style={{ color: "var(--shadeLightDark)" }}>
                        Please select an option
                      </span>
                    )}
                  </span>

                  <div className="options" ref={options}>
                    {storageSizeOption.map((option) => {
                      return (
                        <div
                          className="option-name"
                          key={option.id}
                          onClick={(e) =>
                            handleSelectedStorageVariation(
                              e,
                              option.name,
                              option.price
                            )
                          }
                        >
                          {option.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null
            ) : null}
          </section>
          <ImageSlider images={image} image_default={defaultImage} />
          <section className="detail-description">
            <span>Product description: </span>
            <p>{description || "*no description*"}</p>
          </section>
          <section className="detail-action">
            <div className="close" onClick={() => handleCloseProductDetails()}>
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
                  id,
                  price,
                  "add",
                  variationPrice ? variationPrice : null
                )
              }
            />
          </section>
        </main>
      </ModalWrapper>
      {showAddProductModal && (
        <AddProductModal
          handleCloseAddProductModal={handleCloseAddProductModal}
        />
      )}
    </>
  );
};

export default ProductDetail;
