import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/settings">
        Setting
      </Link>
    </header>
  );
};

export default Header;
