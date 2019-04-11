import React, { Component } from "react";

import { NavListItem } from "./NavListItem";
import Icon from "../BaseComponents/icon/";

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
            icon={
              <Icon
                className="icon search-icon"
                type="searchIcon"
                width={20}
                height={20}
                viewBox="0 0 20 20"
              />
            }
            minimized={this.props.minimized}
          />
          <NavListItem
            path="/dashboard?period=day"
            text={this.props.minimized ? "" : "Dashboard"}
            icon={
              <Icon
                className="icon dashboard-icon"
                type="dashboardIcon"
                width={25}
                height={20}
                viewBox="0 0 25 20"
              />
            }
            minimized={this.props.minimized}
            isActive={this.isActive("/dashboard")}
          />
          <NavListItem
            path="/documents"
            text={this.props.minimized ? "" : "Documents"}
            icon={
              <Icon
                className="icon documents-icon"
                type="documentsIcon"
                width={25}
                height={25}
                viewBox="0 0 25 25"
              />
            }
            minimized={this.props.minimized}
          />
          <NavListItem
            path="/community"
            text={this.props.minimized ? "" : "Community"}
            icon={
              <Icon
                className="icon community-icon"
                type="communityIcon"
                width={25}
                height={17}
                viewBox="0 0 25 17"
              />
            }
            minimized={this.props.minimized}
          />
        </ul>
      </nav>
    );
  }
}

export default NavList;
