import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Icon from "../BaseComponents/icon/";

export class AvatarPreview extends Component {
  static propTypes = {
    srcAvatar: PropTypes.string,
    fullName: PropTypes.string,
    minimized: PropTypes.bool
  };

  render() {
    const { srcAvatar, fullName, minimized } = this.props;

    return (
      <div
        className={
          minimized
            ? "profile-preview profile-preview_minimized"
            : "profile-preview"
        }
      >
        <div className="container-scale">
          <div className="img-wrapper">
            <img
              className="profile-preview__img"
              src={srcAvatar}
              alt="avatar"
            />
            <div className="profile-preview__icon">
              <Icon
                className="settings-icon"
                type="settingsIcon"
                width={minimized ? 6 : 13}
                height={minimized ? 6 : 13}
                viewBox="0 0 13 13"
              />
            </div>
          </div>
        </div>

        {!minimized && <p className="profile-preview__name">{fullName}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fullName: state.auth.user.fullName,
  minimized: state.sidebar.minimized,
  srcAvatar: state.avatar.src
});

export default connect(mapStateToProps)(AvatarPreview);
