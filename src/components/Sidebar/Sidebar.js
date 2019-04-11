import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions/auth";

import NavList from "../Nav/NavList";
import { Social } from "../Social/Social";
import { Logo } from "../Logo/Logo";
import { Button } from "../BaseComponents/Forms/Button";

class Sidebar extends Component {
  state = {
    isMinSidebar: true
  };

  showSidebar = event =>
    this.setState(state => ({ isMinSidebar: !state.isMinSidebar }));

  render() {
    const { authLogout, minimized, mobile } = this.props;
    const { isMinSidebar } = this.state;

    return (
      <div
        className={
          minimized
            ? "sidebar-wrapper sidebar-wrapper_minimized"
            : isMinSidebar && mobile
            ? "sidebar-wrapper sidebar-wrapper_minimized_mobile"
            : "sidebar-wrapper"
        }
      >
        <div className="top-content-wrapper">
          <Logo
            className="logo logo_sidebar"
            minimized={minimized}
            button={
              mobile && (
                <button className="logo-btn" onClick={this.showSidebar}>
                  =
                </button>
              )
            }
          />
          {(!isMinSidebar || !mobile) && <NavList minimized={minimized} />}
        </div>
        {(!isMinSidebar || !mobile) && (
          <div className="bottom-content-wrapper">
            <Social minimized={minimized} />
            <Button
              className="logout-btn"
              text="Log out"
              onClick={authLogout}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  minimized: state.sidebar.minimized,
  mobile: state.resize.mobile
});

export default connect(
  mapStateToProps,
  { ...actions }
)(Sidebar);
