import React, { Component } from "react";

import { NavList } from "../Nav/NavList";
import { Social } from "../Social/Social";
import { Logo } from "../Logo/Logo";
import { Button } from "../BaseComponents/Forms/Button";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/auth";
import { sidebarSize } from "../actions/sidebar";

class Sidebar extends Component {
  render() {
    const { authLogout, minimized, mobile } = this.props;

    return (
      <div
        className={
          minimized
            ? "sidebar-wrapper sidebar-wrapper_minimized"
            : "sidebar-wrapper"
        }
      >
        <div className="top-content-wrapper">
          <Logo className="logo logo_sidebar" minimized={minimized} button={mobile}/>
          <NavList minimized={minimized} />
        </div>
        <div className="bottom-content-wrapper">
          <Social minimized={minimized} />
          <Button className="logout-btn" text="Log out" onClick={authLogout} />
        </div>
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
