import React from "react";
import "../styles/Header.css"; // Create a CSS file for custom styling if needed

const Header = () => {
  return (
    <div className="header-container">
      <video autoPlay muted loop className="background-video">
        <source src="/restaurant.mp4" type="video/mp4" />
      </video>
      <div className="header-content text-center">
        <h1 className="font-weight-bold display-4 text-white">
          Halal Restaurant Finder
        </h1>
        <input
          type="text"
          placeholder="things to do, nail salons, etc"
          className="form-control search-input"
        />
        <input
          type="text"
          placeholder="Location"
          className="form-control location-input"
        />
        <button className="btn btn-danger search-button">Search</button>
      </div>
    </div>
  );
};

export default Header;
