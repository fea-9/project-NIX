import React, { Component } from "react";

import { PropTypes } from "prop-types";

export class Copyright extends Component {
  static propTypes = {
    searchClass: PropTypes.bool
  };

  state = {
    year: new Date().getFullYear()
  };

  render() {
    const { year } = this.state;
    const { searchClass } = this.props;

    return (
      <div className={searchClass ? "copyright copyright_serach" : "copyright"}>
        Copyright &copy; {year}.&nbsp;
        <a className="copyright__link" href="http://www.google.com.ua">
          Cookie Preferences
        </a>
        ,&nbsp;
        <a className="copyright__link" href="http://www.google.com.ua">
          Privacy
        </a>
        &nbsp;and&nbsp;
        <a className="copyright__link" href="http://www.google.com.ua">
          Terms
        </a>
      </div>
    );
  }
}
