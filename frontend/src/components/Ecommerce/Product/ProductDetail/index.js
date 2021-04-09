import React from "react";
import "./ProductDetail.css";
import defaultImage from "../../../../assets/images/Default.png";
import Button from "../../../Button";
import ModalWrapper from "../../../../components/Ecommerce/ModalWrapper";
import ImageSlider from "../../ImageSlider";
import ProductDetailLogic from "./ProdctDetailLogic";
import AddProductModal from "../AddProductModal";

const ProductDetail = ({ detailData, handleCloseProductDetails }) => {
  const { id, name, price, brand, image, description } = detailData;
  const {
    showAddProductModal,
    handleShowAddProductModal,
    handleCloseAddProductModal,
  } = ProductDetailLogic();
  return (
    <>
      <ModalWrapper>
        <section className="product-view product-view-show">
          <div className="detail-header">
            <h5 className="detail-product-name">{name}</h5>
            <div className="sub-details">
              <div className="detail-price">
                ₱ {Number(price).toLocaleString()}.00
              </div>
              <div className="detail-brand">
                Brand: <span>{brand}</span>
              </div>
            </div>
          </div>
          <ImageSlider images={image} image_default={defaultImage} />
          <div className="detail-description">
            <span>Product description: </span>
            <p>{description || "*no description*"}</p>
          </div>
          <div className="detail-action">
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
              functionality={() => handleShowAddProductModal(id, price, "add")}
            />
          </div>
        </section>
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
