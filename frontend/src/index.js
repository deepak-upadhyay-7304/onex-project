/*import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter , Routes , Route } from "react-router-dom";
import './index.css';
import './components.css';
//import './signup.css';
import HomePage from './landing_page/home/HomePage';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import Footer from './landing_page/Footer';
import Navbar from './landing_page/Navbar';
import NotFound from './landing_page/NotFound';
import Signup from './landing_page/signup/Signup';
import Login from './landing_page/signup/Login';
import Home from './landing_page/signup/Home';
import Next from './landing_page/Pages/Deepak';
import Apps from './components/Apps';
import Funds from './components/Funds';
import SignupHome from "./landing_page/signup/Home";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar/> 
    <Routes>
      <Route path='/' element={<HomePage /> } />
      <Route path= '/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/home' elemet={<Home/>}/>
      <Route path='/about' element={<AboutPage /> } />
      <Route path='/products' element={<ProductPage /> } />
      <Route path='/pricing' element={<PricingPage /> } />
      <Route path='/support' element={<SupportPage /> } />
      <Route path='/next' element={<Next/>}/>
      <Route path='*' element={<NotFound/> } />
      <Route path='/signuphome' element={<SignupHome/>}/>
      </Routes>
    <Footer/>
    <Routes>
      <Route path='/apps' element={<Apps/>}/>
      
    </Routes>
    
      
    
  </BrowserRouter>
);*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./landing_page/home/HomePage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import Footer from "./landing_page/Footer";
import Navbar from "./landing_page/Navbar";
import NotFound from "./landing_page/NotFound";
import Signup from "./landing_page/signup/Signup";
import Login from "./landing_page/signup/Login";

import Next from "./landing_page/Pages/Deepak";


import SignupHome from "./landing_page/signup/Home";
import PrivateRoute from "./landing_page/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/nbknbmnmnmkjklklkklloginxxxyyy" element={<Login />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Private Routes Wrapper */}
      <Route element={<PrivateRoute />}>
        <Route path="/next" element={<Next />} />
        <Route path="/signuphome" element={<SignupHome />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
