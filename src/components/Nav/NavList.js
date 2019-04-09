import React from "react";

import { NavListItem } from "./NavListItem";
import * as Icons from "../BaseComponents/Icons/IconsSideBar";

export const NavList = props => (
  <nav className="nav-wrapper">
    <ul
      className={props.minimized ? "nav-list nav-list_minimized" : "nav-list"}
    >
      <NavListItem
        path="/profile"
        elem={React.createElement("div")}
        minimized={props.minimized}
      />
      <NavListItem
        path="/search"
        text={props.minimized ? "" : "Search"}
        icon={<Icons.SearchIcon className="icon search-icon" />}
        minimized={props.minimized}
      />
      <NavListItem
        path="/dashboard/day"
        text={props.minimized ? "" : "Dashboard"}
        icon={<Icons.DashboardIcon className="icon dashboard-icon" />}
        minimized={props.minimized}
      />
      <NavListItem
        path="/documents"
        text={props.minimized ? "" : "Documents"}
        icon={<Icons.DocumentsIcon className="icon documents-icon" />}
        minimized={props.minimized}
      />
      <NavListItem
        path="/community"
        text={props.minimized ? "" : "Community"}
        icon={<Icons.CommunityIcon className="icon community-icon" />}
        minimized={props.minimized}
      />
    </ul>
  </nav>
);
