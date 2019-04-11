import React from "react";
import { connect } from "react-redux";

import { sidebarSize } from "../actions/sidebar";
//import * as Icons from '../BaseComponents/Icons/IconsHeader'
import Button from "../BaseComponents/Button";
import Icon from "../BaseComponents/icon/index";

const Header = ({ title, details, component, sidebarSize, ...rest }) => (
  <>
    <Button className="header__icon-box" onClick={sidebarSize}>
      <Icon
        className="burger-menu-icon"
        type="burgerMenuIcon"
        width={20}
        height={20}
        viewBox="0 0 20 20"
      />
    </Button>
    <div className="header__title-box">
      {title && <h2 className="header__name">{title}</h2>}
      {details && <p className="header__details">{details}</p>}
    </div>
    {component && <div className="header__component-box">{component}</div>}
  </>
);

export const HeaderTemplate = connect(
  null,
  { sidebarSize }
)(Header);
