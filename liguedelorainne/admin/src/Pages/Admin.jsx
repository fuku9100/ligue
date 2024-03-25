import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Main from "../Components/Main/Main";
import NotFound from "../Components/NotFound/NotFound";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Main>
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/" element={<Navigate to="/addproduct" replace />} />
          <Route path="*" element={<NotFound />} />
          <Route index element={<Navigate to="/addproduct" replace />} />
        </Routes>
        <Outlet />
      </Main>
    </div>
  );
};

export default Admin;

// Main.jsx
import React from "react";
import "./CSS/Main.css";

const Main = ({ children }) => {
  return <div className="main">{children}</div>;
};

export default Main;

// NotFound.jsx
import React from "react";

const NotFound = () => {
  return <div>40
