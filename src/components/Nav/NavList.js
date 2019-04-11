import React, { Component } from "react";

import { NavListItem } from "./NavListItem";
import * as Icons from "../BaseComponents/Icons/IconsSideBar";

class NavList extends Component {
  isActive = key => (match, location) => location.pathname === key;

  render() {
    return (
      <nav className="nav-wrapper">
        <ul
          className={
            this.props.minimized ? "nav-list nav-list_minimized" : "nav-list"
          }
        >
          <NavListItem
            path="/profile"
            elem={React.createElement("div")}
            minimized={this.props.minimized}
          />
          <NavListItem
            path="/search"
            text={this.props.minimized ? "" : "Search"}
            icon={<Icons.SearchIcon className="icon search-icon" />}
            minimized={this.props.minimized}
          />
          <NavListItem
            path="/dashboard?period=day"
            text={this.props.minimized ? "" : "Dashboard"}
            icon={<Icons.DashboardIcon className="icon dashboard-icon" />}
            minimized={this.props.minimized}
            isActive={this.isActive("/dashboard")}
          />
          <NavListItem
            path="/documents"
            text={this.props.minimized ? "" : "Documents"}
            icon={<Icons.DocumentsIcon className="icon documents-icon" />}
            minimized={this.props.minimized}
          />
          <NavListItem
            path="/community"
            text={this.props.minimized ? "" : "Community"}
            icon={<Icons.CommunityIcon className="icon community-icon" />}
            minimized={this.props.minimized}
          />
        </ul>
      </nav>
    );
  }
}

export default NavList;
