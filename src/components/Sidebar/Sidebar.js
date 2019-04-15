import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../actions/auth";

import NavList from "../Nav/NavList";
import { Social } from "../Social/Social";
import { Logo } from "../Logo/Logo";
import { Button } from "../BaseComponents/Forms/Button";
import { BurgerButton } from "../BaseComponents/BurgerButton";

class Sidebar extends Component {
  static propTypes = {
    minimized: PropTypes.bool,
    mobile: PropTypes.bool
  };

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
                <BurgerButton
                  onClick={this.showSidebar}
                  isOpen={!isMinSidebar}
                />
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
