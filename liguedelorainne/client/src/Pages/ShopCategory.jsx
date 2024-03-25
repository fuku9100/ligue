import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsToDisplay = 12;

  const fetchInfo = () => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const displayedItems = allproducts.slice(0, itemsToDisplay);

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="Shop banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>{`Showing 1 - ${itemsToDisplay}`}</span> out of {allproducts.length}{" "}
          Products
        </p>
        <div className="shopcategory-sort">Sort by <img src={dropdown_icon} alt="Sort icon" /></div>
      </div>
      <div className="shopcategory-products">
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&
          allproducts.length > 0 &&
          displayed
