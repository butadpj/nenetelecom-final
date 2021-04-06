import React from "react";
import "./ImageSlider.css";
import ImageSliderLogic from "./ImageSliderLogic";

import prevBtn from "../../../assets/svgs/btn-prev.svg";
import nextBtn from "../../../assets/svgs/btn-next.svg";

const ImageSlider = ({ images, image_default }) => {
  const {
    current,
    length,
    prevSlide,
    nextSlide,
    setCurrent,
  } = ImageSliderLogic({
    images,
  });

  return (
    <div className="image-slider">
      {length == 0 ? null : (
        <div>
          <div className="sliders">
            <div className="slider-btn">
              <img
                src={prevBtn}
                alt="previous_button"
                className="btn-prev"
                onClick={prevSlide}
              />
              <img
                src={nextBtn}
                alt="next_button"
                className="btn-next"
                onClick={nextSlide}
              />
            </div>
            {images.map((image, index) => {
              return (
                <div className="image" key={index}>
                  <div
                    className={index === current ? "slide active" : "slide"}
                    key={index}
                  >
                    {index === current && (
                      <div className="detail-product-image">
                        <img
                          src={image || image_default}
                          alt="detail-product-image"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="slider-preview-wrapper">
            <div className="slider-preview">
              {images.map((image, index) => {
                if (image) {
                  return (
                    <img
                      width="70"
                      height="50"
                      src={image}
                      alt=""
                      key={index}
                      className={
                        index === current
                          ? "image-preview active"
                          : "image-preview"
                      }
                      onClick={() => setCurrent(index)}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
