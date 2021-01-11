import React from "react";
import "./Technicians.css";
import technicianIcon from "../../../assets/svgs/tools-solid.svg";
import Header from "../../../components/Header/";
import Cards from "../../../components/Card/";
import Button from "../../../components/Button/";

const Technicians = () => {
  return (
    <section className="technicians" id="technicians">
      <Header icon={technicianIcon} text="Our Technicians" />
      <div className="cards">
        <Cards
          icon="https://louisville.edu/enrollmentmanagement/images/person-icon/image"
          text="SHORT DESCRIPTION ABOUT THE TECHNICIAN"
        />
        <Cards
          icon="https://louisville.edu/enrollmentmanagement/images/person-icon/image"
          text="SHORT DESCRIPTION ABOUT THE TECHNICIAN"
        />
        <Cards
          icon="https://louisville.edu/enrollmentmanagement/images/person-icon/image"
          text="SHORT DESCRIPTION ABOUT THE TECHNICIAN"
        />
      </div>
      <div className="techniciansBtn">
        <Button type="button" text="ask something?" />
      </div>
    </section>
  );
};

export default Technicians;
