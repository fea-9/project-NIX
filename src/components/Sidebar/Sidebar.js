import React, { Component } from "react";

import { NavList } from "../Nav/NavList";
import { Social } from "../Social/Social";
import { Logo } from "../Logo/Logo";
import { Button } from "../BaseComponents/Forms/Button";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/auth";

class Sidebar extends Component {
  state = {
    minimized: false
  };

  clickHandler = e => {
    this.setState(state => ({
      minimized: !state.minimized
    }));
  };

  render() {
    const { authLogout } = this.props;

    return (
      <div
        className={
          this.state.minimized
            ? "sidebar-wrapper sidebar-wrapper_minimized"
            : "sidebar-wrapper"
        }
      >
        <div className="top-content-wrapper">
          <div className="logo-wrapper">
            <Logo className="logo logo_sidebar" minimized={this.state.minimized} />
          </div>
          <div className="user-profile">
            <div className="profile" onClick={this.clickHandler} />
          </div>
          <div className="nav">
            <NavList minimized={this.state.minimized} />
          </div>
        </div>
        <div className="social">
          <Social minimized={this.state.minimized} />
        </div>
        <div className="logout">
          <Button className="logout-btn" text="Log out" onClick={authLogout} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actions }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Sidebar);
