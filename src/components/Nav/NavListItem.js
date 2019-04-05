import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const NavListItem = props => (
  <NavLink className="link" to={props.path}>
    {props.icon}
    {props.text}
  </NavLink>
);
