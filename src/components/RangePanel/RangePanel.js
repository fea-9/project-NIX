import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions/dashboardRange";

class RangePanel extends Component {
  render() {
    const { dashboardRequest } = this.props;
    const token = localStorage.getItem("access_token");

    return (
      <ul className="range-panel-list">
        <li className="range-panel-list__item">
          <NavLink
            className="range-panel-list__link"
            to="/dashboard/day"
            activeClassName="range-panel-list__link_selected"
            onClick={e => dashboardRequest({ period: "day" }, token)}
          >
            Today
          </NavLink>
        </li>
        <li className="range-panel-list__item">
          <NavLink
            className="range-panel-list__link"
            to="/dashboard/week"
            activeClassName="range-panel-list__link_selected"
            onClick={e => dashboardRequest({ period: "week" }, token)}
          >
            7 days
          </NavLink>
        </li>
        <li className="range-panel-list__item">
          <NavLink
            className="range-panel-list__link"
            to="/dashboard/month"
            activeClassName="range-panel-list__link_selected"
            onClick={e => dashboardRequest({ period: "month" }, token)}
          >
            30 days
          </NavLink>
        </li>
        <li className="range-panel-list__item">
          <NavLink
            className="range-panel-list__link"
            to="/dashboard/quarter"
            activeClassName="range-panel-list__link_selected"
            onClick={e => dashboardRequest({ period: "quarter" }, token)}
          >
            90 days
          </NavLink>
        </li>
        <li className="range-panel-list__item">
          <NavLink
            className="range-panel-list__link"
            to="/dashboard/range"
            activeClassName="range-panel-list__link_selected"
          >
            Range
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default connect(
  null,
  { ...actions }
)(RangePanel);
