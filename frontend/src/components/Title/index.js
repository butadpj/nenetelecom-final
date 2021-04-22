import React from "react";
import "./Title.css";

const Title = ({ text1, text1Span, text2, text2Span, cName }) => {
  return (
    <div className={[cName + " section-title"]}>
      <p className="title-text-1">
        {text1}
        <span>{text1Span}</span>
      </p>
      <p className="title-text-2">
        {text2}
        <span>{text2Span}</span>
      </p>
    </div>
  );
};

export default Title;
