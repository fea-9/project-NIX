import React, { Component } from "react";

import { PropTypes } from "prop-types";

import { NavListItem } from "./NavListItem";
import AvatarPreview from "../AvatarPreview/AvatarPreview";
import Icon from "../BaseComponents/icon/";

class NavList extends Component {
  static propTypes = {
    minimized: PropTypes.bool
  };

  static defaultProps = {
    minimized: false
  };

  isActive = key => (match, location) => location.pathname === key;

  state = {
    listItems: [
      {
        path: "/profile",
        elem: <AvatarPreview />
      },
      {
        path: "/search",
        text: "Search",
        icon: {
          className: "icon search-icon",
          type: "searchIcon",
          width: 20,
          height: 20,
          viewBox: "0 0 20 20"
        }
      },
      {
        path: "/dashboard?period=day",
        text: "Dashboard",
        icon: {
          className: "icon dashboard-icon",
          type: "dashboardIcon",
          width: 25,
          height: 20,
          viewBox: "0 0 25 20"
        },
        isActive: this.isActive("/dashboard")
      },
      {
        path: "/documents",
        text: "Documents",
        icon: {
          className: "icon documents-icon",
          type: "documentsIcon",
          width: 25,
          height: 25,
          viewBox: "0 0 25 25"
        }
      },
      {
        path: "/community",
        text: "Community",
        icon: {
          className: "icon community-icon",
          type: "communityIcon",
          width: 25,
          height: 17,
          viewBox: "0 0 25 17"
        }
      }
    ]
  };

  render() {
    const { listItems } = this.state;
    const { minimized } = this.props;

    return (
      <nav className="nav-wrapper">
        <ul className={minimized ? "nav-list nav-list_minimized" : "nav-list"}>
          {listItems.map((listItem, index) => {
            const { path, elem, isActive, text, icon } = listItem;
            return (
              <NavListItem
                path={path}
                elem={elem}
                text={text}
                icon={icon && <Icon {...icon} />}
                minimized={minimized}
                isActive={isActive}
                key={index}
              />
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default NavList;
