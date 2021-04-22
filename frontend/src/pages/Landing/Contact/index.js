import React from "react";
import "./Contact.css";
import Title from "../../../components/Title";
import Card from "../../../components/Social/Card";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <Title
        text1="CONT"
        text1Span="ACT"
        text2="U"
        text2Span="S"
        cName="contact-title"
      />
      <Card />
    </section>
  );
};

export default Contact;
