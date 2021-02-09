import React from "react";
import "./About.css";
import Title from "../../../components/Title";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="bg1"></div>
      <Title
        text1="AB"
        text1Span="OUT"
        text2="U"
        text2Span="S"
        cName="about-title"
      />
      <div className="about-text">
        <p>
          <b>Nene Telecom</b> is a mobile phone retail store in Philippines,
          owned by Nene, an authorized retailer for more than a decade.
        </p>
      </div>
    </section>
  );
};

export default About;
