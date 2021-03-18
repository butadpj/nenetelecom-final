import React from "react";
import "./Title.css";

const Title = ({ text1, text1Span, text2, text2Span, cName }) => {
  return (
    <header className={[cName + " section-title"]}>
      <h1 className="title-text-1">
        {text1}
        <span>{text1Span}</span>
      </h1>
      <h1 className="title-text-2">
        {text2}
        <span>{text2Span}</span>
      </h1>
    </header>
  );
};

export default Title;
