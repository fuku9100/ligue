import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        const response = await fetch('http://localhost:4000/removeproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });
        if (!response.ok) {
          throw new Error('Failed to remove product');
        }
        fetchInfo();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      {loading && <p>Loading...</p>}
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Stock</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        {allproducts.map((e) => {
          return (
            <div key={e.id}>
              <div className="listproduct-format">
                {e.image && <img className="listproduct-product-icon" src={e.image} alt={e.name} />}
                <p cartitems-product-title>{e.name}</p>
                <p>${e.old_price}</p>
                <p>${e.new_price}</p>
                <p>{e.stock}</p>
                <p>{e.category}</p>
                <img className="list
