import NavbarTop from "./NavbarTop";
import React from "react";
import NavbarBottom from "./NavbarBottom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div id="navbar-outer">
      <div id="navbar">
        <NavbarTop />
        <NavbarBottom />
      </div>
    </div>
  );
};

export default Navbar;
