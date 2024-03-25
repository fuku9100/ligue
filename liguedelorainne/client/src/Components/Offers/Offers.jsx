import React from "react";
import PropTypes from "prop-types";
import "./Offers.css";
import exclusiveImage from "../Assets/exclusive_image.png"; // use destructuring to rename the import

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1 className="offers-title">Exclusive</h1>
        <h1 className="offers-title">Offers For You</h1>
        <p className="offers-subtitle">ONLY ON BEST SELLERS PRODUCTS</p>
        <button className="offers-button" type="button">
          Check now
        </button>
      </div>
      <div className="offers-right">
        <img src={exclusiveImage} alt="An exclusive image representing the offer" />
      </div>
    </div>
  );
};

Offers.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Offers;
