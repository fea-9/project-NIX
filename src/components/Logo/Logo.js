import React from "react";
import { Link } from "react-router-dom";

export const Logo = props => (
  <Link to="/dashboard" className='link'>
    <h1 className="logo">{props.minimized ? "L" : "Logo"}</h1>
  </Link>
);
