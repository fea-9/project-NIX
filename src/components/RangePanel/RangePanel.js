import React, { Component } from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";

import * as actions from "../actions/dashboardRange";

import Calendar from "../Calendar/Calendar";

class RangePanel extends Component {
  state = {
    showCalendar: false,
    periods: ["day", "week", "month", "quarter", "range"]
  };

  resetShowCalendar = event => this.setState({ showCalendar: false });

  showCalendar = event =>
    this.setState(state => ({ showCalendar: !state.showCalendar }));

  isActive = day => (match, location) => {
    const search = queryString.parse(location.search);
    if (search.period === day) {
      return true;
    }
    return false;
  };

  componentDidUpdate(prevProps, prevState) {
    const { location, getStats } = this.props;
    const search = queryString.parse(location.search);

    if (prevProps.location.search !== location.search) {
      return !prevProps.location.search
        ? null
        : search.period === "range"
        ? null
        : getStats(search);
    }
  }

  render() {
    const { location, mobile } = this.props;
    const { periods } = this.state;
    const search = queryString.parse(location.search);

    if (!periods.includes(search.period)) {
      return <Redirect to="/dashboard?period=day" />;
    }

    return (
      <div
        className={
          mobile
            ? "range-panel-wrapper range-panel-wrapper__mobile"
            : "range-panel-wrapper"
        }
      >
        <ul className="range-panel-list">
          <li className="range-panel-list__item">
            <NavLink
              className="range-panel-list__link"
              to="/dashboard?period=day"
              activeClassName="range-panel-list__link_selected"
              isActive={this.isActive("day")}
              onClick={this.resetShowCalendar}
            >
              Today
            </NavLink>
          </li>
          <li className="range-panel-list__item">
            <NavLink
              className="range-panel-list__link"
              to="/dashboard?period=week"
              activeClassName="range-panel-list__link_selected"
              isActive={this.isActive("week")}
              onClick={this.resetShowCalendar}
            >
              7 days
            </NavLink>
          </li>
          <li className="range-panel-list__item">
            <NavLink
              className="range-panel-list__link"
              to="/dashboard?period=month"
              activeClassName="range-panel-list__link_selected"
              isActive={this.isActive("month")}
              onClick={this.resetShowCalendar}
            >
              30 days
            </NavLink>
          </li>
          <li className="range-panel-list__item">
            <NavLink
              className="range-panel-list__link"
              to="/dashboard?period=quarter"
              activeClassName="range-panel-list__link_selected"
              isActive={this.isActive("quarter")}
              onClick={this.resetShowCalendar}
            >
              90 days
            </NavLink>
          </li>
          <li className="range-panel-list__item">
            <NavLink
              className="range-panel-list__link"
              to="/dashboard?period=range"
              activeClassName="range-panel-list__link_selected"
              onClick={this.showCalendar}
              isActive={this.isActive("range")}
            >
              Range
            </NavLink>
          </li>
        </ul>
        {this.state.showCalendar && <Calendar />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mobile: state.resize.mobile
});

export default withRouter(
  connect(
    mapStateToProps,
    { ...actions }
  )(RangePanel)
);
