import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 

import { ToastContainer, toast } from "react-toastify";
//import dashboardhome from "components/DashboardHome";

const Login = () => {
  //const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }; 

  const handleError = (err) =>
    toast.error(err, {
      position: "top-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log("Login Response:", data); // ✅ Debugging: Check if token exists

      const { success, message  , token } = data;

      if (success) {
        if (!token) {
          console.error("JWT token is missing in API response.");
          handleError("Authentication failed. Please try again.");
          return;
        }

         // ✅ Decode JWT token to get user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;  // Assuming "id" is inside the token
      
      // ✅ Store user ID in localStorage
      //localStorage.setItem("uid", userId);
      //console.log("Stored UID:", userId); // ✅ Debugging
        
        handleSuccess(message);
        setTimeout(() => {
          
          window.location.href = `http://localhost:3003/dashboard?uid=${userId}`; // Redirects to dashboard app
          //navigate("/next")
        },3000);
      } 
        else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="signupmain">
      <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            No account, Create? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;