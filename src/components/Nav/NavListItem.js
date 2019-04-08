import React from "react";
import { NavLink } from "react-router-dom";

export const NavListItem = ({ path, elem, icon, text, minimized }) => (
  <li
    className={
      minimized ? "nav-list__item nav-list__item_minimized" : "nav-list__item"
    }
  >
    <NavLink className="link-sidebar" to={path}>
      {elem && <div className="link-sidebar__profile">{elem}</div>}
      {icon}
      {<span className="link-sidebar__text">{text}</span>}
    </NavLink>
  </li>
);
