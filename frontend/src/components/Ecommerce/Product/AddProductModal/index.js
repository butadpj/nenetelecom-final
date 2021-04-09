import React from "react";
import "./AddProductModal.css";
import { Link } from "react-router-dom";
import closeIcon from "../../../../assets/svgs/close.svg";
import ModalWrapper from "../../../../components/Ecommerce/ModalWrapper";
import Button from "../../../Button";

const AddProductModal = ({ handleCloseAddProductModal }) => {
  return (
    <ModalWrapper>
      <section className="add-product-modal add-product-modal-show">
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
    </ModalWrapper>
  );
};

export default AddProductModal;
