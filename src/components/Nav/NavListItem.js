import React from "react";
import { NavLink } from "react-router-dom";

import { PropTypes } from "prop-types";

export const NavListItem = ({
  path,
  elem,
  icon,
  text,
  minimized,
  isActive
}) => (
  <li
    className={
      minimized ? "nav-list__item nav-list__item_minimized" : "nav-list__item"
    }
  >
    <NavLink className="link-sidebar" to={path} isActive={isActive}>
      {elem && <div className="link-sidebar__profile">{elem}</div>}
      {icon}
      {<span className="link-sidebar__text">{!minimized ? text : ""}</span>}
    </NavLink>
  </li>
);

NavListItem.propTypes = {
  path: PropTypes.string,
  elem: PropTypes.element,
  icon: PropTypes.element,
  text: PropTypes.string,
  minimized: PropTypes.bool,
  isActive: PropTypes.func
};
