import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Switch, Link, Outlet, useParams } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";

const Product = lazy(() => import("./Pages/Product"));

function App() {
  return (
    <div>
      <Router>
        <Navbar>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/mens">Men</Link></li>
            <li><Link to="/womens">Women</Link></li>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/login">Login/Signup</Link></li>
          </ul>
        </Navbar>
        <Routes>
          <Route exact path="/" element={<Shop gender="all" />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route
