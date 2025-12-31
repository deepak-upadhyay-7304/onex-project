/*import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = () => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [userEmail, setUserEmail] = useState("");
  const [uuid, setUid] = useState(null);

  const { closeBuyWindow } = useContext(GeneralContext); // FIXED
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Extract `uid` from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("uid");
    console.log("Extracted UID from URL:", userId); // 🔍 Debugging

    if (!userId) {
      window.location.href = "http://localhost:3003";
    } else {
      setUid(userId);
      fetchUserEmail(userId);
    }
  }, [location]);

  // ✅ Fetch user email from the backend
  const fetchUserEmail = async (userId) => {
    try {
      if (!userId) {
        console.error("No user ID provided to fetch email.");
        return;
      }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`);
      
      if (!response.data.email) {
        console.error("Fetched user has no email associated.");
        return;
      }
  
      setUserEmail(response.data.email);
      console.log("User Email Fetched:", response.data.email);
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };
  
  // ✅ Handle Buy Click
  const handleBuyClick = async () => {
    try {
      //const stockName = uid; // Modify this based on your stock selection logic

      // Place order
      const orderResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/newOrder`, {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
        email: userEmail,  // ✅ Include email
      });

      if (orderResponse.status === 200) {
        // Send confirmation email
        await axios.post(`${process.env.REACT_APP_BASE_URL}/send-email`, {
          email: userEmail,
          stockName: uid,
          quantity: stockQuantity,
          price: stockPrice,
          mode: "BUY",
        });

        alert("Order placed and confirmation email sent!");
      }
    } catch (error) {
      console.error("Error processing order:", error);
    }
    closeBuyWindow();
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;*/

import React, { useState , useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    axios.post("https://onex-dashboard.onrender.com/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });
    handleSendEmail();

    closeBuyWindow();
  };

  const handleSendEmail =() => {
    axios.post("https://onex-dashboard.onrender.com/send-email",{
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
  });
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;


/*import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = () => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [userEmail, setUserEmail] = useState("");
  const [uid, setUid] = useState(null);
  const { closeBuyWindow } = useContext(GeneralContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Extract `uid` from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("uid");
    console.log("Extracted UID from URL:", userId);

    if (!userId) {
      window.location.href = "http://localhost:3000";
    } else {
      setUid(userId);
      fetchUserEmail(userId);
    }
  }, [location]);

  // ✅ Fetch user email from the backend
  const fetchUserEmail = async (userId) => {
    try {
      if (!userId) {
        console.error("No user ID provided to fetch email.");
        return;
      }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`);
      
      if (!response.data.email) {
        console.error("Fetched user has no email associated.");
        return;
      }
  
      setUserEmail(response.data.email);
      console.log("User Email Fetched:", response.data.email);
    } catch (error) {
      console.error("Error fetching user email:", error);
    }
  };

  // ✅ Step 1: Place the order
  const handleBuyClick = async () => {
    try {
      console.log("🛒 Placing Order...");

      const orderResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/newOrder`, {
        name: uid, // Stock Name or ID
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
        email: userEmail, 
      });

      console.log("✅ Order Placed:", orderResponse.data);

      if (orderResponse.status === 200) {
        alert("✅ Order placed successfully!");
        handleSendEmail();
        // ✅ Call the new function to send the email
        
      } else {
        alert("❌ Failed to place order.");
        //handleSendEmail();
      }
    } catch (error) {
      console.error("❌ Error processing order:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  // ✅ Step 2: Send confirmation email separately
  const handleSendEmail = async () => {
    console.log("📧 Preparing email with data:", {
      email: userEmail,
      stockName: uid,
      quantity: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });
  
    try {
      const emailResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/send-email`,
        {
          email: userEmail,
          stockName: uid,
          quantity: stockQuantity,
          price: stockPrice,
          mode: "BUY",
        }
      );
  
      console.log("📧 Email API Response:", emailResponse.data);
  
      if (emailResponse.status === 200) {
        alert("✅ Confirmation email sent!");
      } else {
        alert("⚠️ Email failed to send.");
      }
    } catch (error) {
      console.error("❌ Error sending email:", error);
      alert("Something went wrong while sending the email.");
    }
  };

  // Handle Cancel Click
  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          <Link to={`/buy?uid=${uid}`} className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;*/
