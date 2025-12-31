import React from 'react';

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center   border-bottom  border-warning border-2 ">
        <img
          src="images/homeHero.png"
           alt="Hero Image"
          className="mb-5 "
        />
        
        <h1 className="mt-5">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        <a href='http://localhost:3000/signup'>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
        </a>
      </div>
    </div>
  );
}

export default Hero;
