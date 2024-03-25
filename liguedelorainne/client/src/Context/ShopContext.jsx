import React, { createContext, useEffect, useState, useCallback } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * (itemInfo?.new_price || 0);
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      const authToken = localStorage.getItem("auth-token");
      (async () => {
        try {
          const response = await fetch('http://localhost:4000/addtocart', {
            method: 'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': authToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId }),
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      const authToken = localStorage.getItem("auth-token");
      (async () => {
        try {
          const response = await fetch('http://localhost:4000/removefromcart', {
            method: 'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': authToken,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId }),
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));

    if (localStorage.getItem("auth-token")) {
      const authToken = localStorage.getItem("auth-token");
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((
