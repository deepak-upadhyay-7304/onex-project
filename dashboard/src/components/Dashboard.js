import React, {useEffect,useState}from "react";
import { Route, Routes ,useNavigate} from "react-router-dom";
//import axios from "axios";
//import Cookies from "js-cookie";

//import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import RazorpayPayment from "./RazorpayPayment-DESKTOP-KNQUSS4";


const Dashboard = () => { 

  /*const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = Cookies.get("token");  // ✅ Read token from cookies

    if (!token) {
      console.log("No token found, redirecting to login.");
      navigate("/login");
      return;
    }

    axios.get(`${process.env.REACT_APP_BASE_URL}/auth/verify-token`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true  // ✅ Ensure cookies are sent
      })
      .then((response) => {
        console.log("Token verification response:", response.data);
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          console.log("Token is invalid, redirecting to login.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Token verification failed:", error);
        Cookies.remove("token")
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);*/

  

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/razorpaypayment" element={<RazorpayPayment/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;