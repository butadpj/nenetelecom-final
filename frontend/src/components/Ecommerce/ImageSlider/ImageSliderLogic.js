import React, { useState } from "react";

const ImageSliderLogic = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  return { current, length, prevSlide, nextSlide, setCurrent };
};

export default ImageSliderLogic;
