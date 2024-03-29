import React from "react";
import "./ProductDetail.css";
import defaultImage from "../../../../assets/images/Default.png";
import Button from "../../../Button";
import ModalWrapper from "../../../../components/Ecommerce/ModalWrapper";
import ImageSlider from "../../ImageSlider";
import ProductDetailLogic from "./ProductDetailLogic";
import AddProductModal from "../AddProductModal";

const ProductDetail = React.memo(
  ({ detailData, handleCloseProductDetails }) => {
    const {
      id,
      name,
      price,
      brand,
      images,
      description,
      variations,
    } = detailData;

    let storageSizeOption = variations
      ? variations.filter((option) => option.category == "Storage Size")
      : null;
    let colorFamilyOption = variations
      ? variations.filter((option) => option.category == "Color Family")
      : null;

    console.log(storageSizeOption);

    const {
      showAddProductModal,
      handleShowAddProductModal,
      handleCloseAddProductModal,
      selectedStorageVariation,
      selectedColorVariation,
      handleSelectedStorageVariation,
      handleSelectedColorVariation,
      variationPrice,
    } = ProductDetailLogic();

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
              {variations.length ? (
                storageSizeOption.length ? (
                  <div className="category storage-size">
                    <span className="category-name">Storage Size: </span>
                    <span className="variation-value">
                      {selectedStorageVariation ? (
                        <>
                          <span className="variation-name">
                            {selectedStorageVariation} {"> "}
                          </span>
                          <span className="variation-price">
                            ₱ {Number(variationPrice).toLocaleString()}.00
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "var(--shadeLightDark)" }}>
                          Please select an option
                        </span>
                      )}
                    </span>
                    <div className="options">
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
              {variations.length ? (
                colorFamilyOption.length ? (
                  <div className="category color-family">
                    <span className="category-name">Color Family: </span>
                    <span className="variation-value">
                      {selectedColorVariation ? (
                        <>
                          <span className="variation-name">
                            {selectedColorVariation}
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "var(--shadeLightDark)" }}>
                          Please select an option
                        </span>
                      )}
                    </span>
                    <div className="options">
                      {colorFamilyOption.map((option) => {
                        return (
                          <div
                            className="option-name"
                            key={option.id}
                            onClick={(e) =>
                              handleSelectedColorVariation(e, option.name)
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
            <ImageSlider images={images} image_default={defaultImage} />
            <section className="detail-description">
              <span>Product description: </span>
              <p>{description || "*no description*"}</p>
            </section>
            <section className="detail-action">
              <div
                className="close"
                onClick={() => handleCloseProductDetails()}
              >
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
                    variationPrice ? variationPrice : null,
                    selectedStorageVariation,
                    selectedColorVariation
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
  }
);

export default ProductDetail;
