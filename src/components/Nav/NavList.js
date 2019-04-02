import React from "react";

import { NavListItem } from "./NavListItem";
// import * as Icons from "../BaseComponents/my-Icons";
import * as Icons from '../BaseComponents/Icons/IconsSideBar'

export const NavList = props => (
  <nav className="nav-wrapper">
    <ul className={
      props.minimized 
        ? "nav-list nav-list_minimized"
        : "nav-list"
    }>
      <li className="nav-list-item">
        <NavListItem
          path="/auth"
          text={props.minimized ? "" : "Search"}
          icon={<Icons.SearchIcon className='icon search-icon' />} />
      </li>
      <li className="nav-list-item">
        <NavListItem
          path="/dashboard"
          text={props.minimized ? "" : "Dashboard"}
          icon={<Icons.DashboardIcon className='icon dashboard-icon' />}
        />
      </li>
      <li className="nav-list-item">
        <NavListItem
          path="/documents"
          text={props.minimized ? "" : "Documents"}
          icon={<Icons.DocumentsIcon className='icon documents-icon' />}
        />
      </li>
      <li className="nav-list-item">
        <NavListItem
          path="/community"
          text={props.minimized ? "" : "Community"}
          icon={<Icons.CommunityIcon className='icon community-icon' />}
        />
      </li>
    </ul>
  </nav>
);
