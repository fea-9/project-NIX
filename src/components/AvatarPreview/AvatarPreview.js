import React, { Component } from "react";
import { connect } from "react-redux";

import Icon from "../BaseComponents/icon/";

class AvatarPreview extends Component {
  render() {
    const { srcAvatar, fullName, minimized } = this.props;

    return (
      <div className={minimized ? "profile-preview profile-preview_minimized" : "profile-preview"}>
        <div className="img-wrapper">
          <img
            className="profile-preview__img"
            src={"http://www.blackdesertbase.com/img/users/avatars/70.png"}
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
        {!minimized && <p className="profile-preview__name">{fullName}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fullName: state.auth.user.fullName,
  minimized: state.sidebar.minimized
});

export default connect(mapStateToProps)(AvatarPreview);
