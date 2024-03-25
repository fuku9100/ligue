import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const { products, cartItems, removeFromCart } = useContext(ShopContext);
  const calcTotalPrice = (price, quantity) => price * quantity;
  const calcTotalCartAmount = () => Object.values(cartItems).reduce((acc, val) => acc + val, 0);
  const calcSubtotal = () => calcTotalCartAmount() * products[0].new_price;
  const calcShippingFee = () => 0;
  const calcTotal = () => calcSubtotal() + calcShippingFee();
  const handlePromoCode = (e) => {
    e.preventDefault();
    // handle promo code logic here
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{
        if(cartItems[e.id]>0)
        {
          return  <div key={e.id}>
                    <div className="cartitems-format">
                      <img className="cartitems-product-icon" src={e.image} alt="" />
                      <p cartitems-product-title>{e.name}</p>
                      <p>${e.new_price}</p>
                      <button className="cartitems-quatity">{cartItems[e.id]}</button>
                      <p>${calcTotalPrice(e.new_price, cartItems[e.id])}</p>
                      <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${calcSubtotal()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p
