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
          <b>Nene Telecom</b> is an online platform for authorized phone
          resellers, and professional gadget technicians in the Philippines
        </p>
      </div>
    </section>
  );
};

export default About;
