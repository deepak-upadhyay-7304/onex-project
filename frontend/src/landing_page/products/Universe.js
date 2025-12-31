import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Onex Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="images/smallcaseLogo.png" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images\goldenpiLogo.png" />
          <p className="text-small text-muted">Bonds Trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images\sensibullLogo.svg" />
          <p className="text-small text-muted">Options Trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images\smallcaseLogo.png" />
          <p className="text-small text-muted">Asset Management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images\goldenpiLogo.png" />
          <p className="text-small text-muted">Bonds Trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="images/smallcaseLogo.png" />
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <a href="http://localhost:3000/signup">
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

export default Universe;