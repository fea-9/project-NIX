import React, { Component } from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { PropTypes } from "prop-types";
import queryString from "query-string";

import * as actions from "../actions/dashboardRange";

import Calendar from "../Calendar/Calendar";

class RangePanel extends Component {
  static propTypes = {
    location: PropTypes.object,
    mobile: PropTypes.bool
  };

  state = {
    showCalendar: false,
    periods: ["day", "week", "month", "quarter", "range"],
    buttons: [
      {
        text: "Today",
        period: "day",
        to: "/dashboard?period=day",
        activeClassName: "range-panel-list__link_selected"
      },
      {
        text: "7 days",
        period: "week",
        to: "/dashboard?period=week",
        activeClassName: "range-panel-list__link_selected"
      },
      {
        text: "30 days",
        period: "month",
        to: "/dashboard?period=month",
        activeClassName: "range-panel-list__link_selected"
      },
      {
        text: "90 days",
        period: "quarter",
        to: "/dashboard?period=quarter",
        activeClassName: "range-panel-list__link_selected"
      },
      {
        text: "Range",
        period: "range",
        to: "/dashboard?period=range",
        activeClassName: "range-panel-list__link_selected"
      }
    ]
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
    const { periods, buttons, showCalendar } = this.state;
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
          {buttons.map(btn => {
            const { text, period, to, activeClassName } = btn;
            return (
              <li className="range-panel-list__item" key={period}>
                <NavLink
                  className="range-panel-list__link"
                  to={to}
                  activeClassName={activeClassName}
                  isActive={this.isActive(period)}
                  onClick={
                    period === "range"
                      ? this.showCalendar
                      : this.resetShowCalendar
                  }
                >
                  {text}
                </NavLink>
              </li>
            );
          })}
        </ul>
        {showCalendar && <Calendar />}
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
