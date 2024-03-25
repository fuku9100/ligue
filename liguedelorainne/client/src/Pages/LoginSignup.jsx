import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === "Login") {
      await login();
    } else {
      await signup();
    }
  };

  const login = async () => {
    const { email, password } = formData;
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const { success, errors, token } = data;
      if (success) {
        localStorage.setItem("auth-token", token);
        window.location.replace("/");
      } else {
        alert(errors);
      }
    } catch (error) {
      console.error("Error in login:", error);
    }
  };

  const signup = async () => {
    const { username, email, password } = formData;
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      const { success, errors, token } = data;
      if (success) {
        localStorage.setItem("auth-token", token);
        window.location.replace("/");
      } else {
        alert(errors);
      }
    } catch (error) {
      console.error("Error in signup:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {state === "Sign Up" && (
              <input
                type="text"
                placeholder="Your name"
                name="username"
                value={formData.username}
                onChange={changeHandler}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              required
            />
          </div>
          <button type="submit">{state.toUpperCase()}</button>
        </form>

        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account? <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => setState("Login")}>Login here</span>
          </p>
       
