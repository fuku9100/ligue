import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

  let [menu,setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);

  return (
    <div className='nav'>
      <Link to='/' title="Homepage" style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="Maison des Ligues de Lorraine logo" />
        <p>Maison des Ligues de Lorraine</p>
      </Link>
      <ul className="nav-menu">
        <li key="shop" onClick={()=>{setMenu("shop")}}>
          <Link to='/' title="Shop" style={{ textDecoration: 'none' }}>Shop{menu==="shop" && <hr />}</Link>
        </li>
        <li key="mens" onClick={()=>{setMenu("mens")}}>
          <Link to='/mens' title="Men's Clothing" style={{ textDecoration: 'none' }}>Vetement{menu==="mens" && <hr />}</Link>
        </li>
        <li key="womens" onClick={()=>{setMenu("womens")}}>
          <Link to='/womens' title="Women's Accessories" style={{ textDecoration: 'none' }}>Accessoires{menu==="womens" && <hr />}</Link>
        </li>
        <li key="kids" onClick={()=>{setMenu("kids")}}>
          <Link to='/kids' title="Kids' Objects" style={{ textDecoration: 'none' }}>Objet{menu==="kids" && <hr />}</Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.
