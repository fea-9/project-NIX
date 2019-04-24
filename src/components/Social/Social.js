import React, { Component } from "react";

import PropTypes from "prop-types";
import Icon from "../BaseComponents/icon/";

export class Social extends Component {
  static propTypes = {
    minimized: PropTypes.bool
  };

  state = {
    socials: [
      {
        link: "https://www.facebook.com/",
        className: "social-icon facebook-icon",
        type: "facebookIcon"
      },
      {
        link: "https://twitter.com/",
        className: "social-icon twitter-icon",
        type: "twitterIcon"
      },
      {
        link: "https://www.youtube.com/",
        className: "social-icon youtube-icon",
        type: "youtubeIcon"
      }
    ]
  };

  render() {
    const { minimized } = this.props;
    const { socials } = this.state;
    return (
      <ul
        className={
          minimized ? "social-list social-list_minimized" : "social-list"
        }
      >
        {socials.map((elem, index) => {
          const { link, className, type } = elem;
          return (
            <li className="social-list-item" key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Icon
                  className={className}
                  type={type}
                  width={30}
                  height={30}
                  viewBox="0 0 30 30"
                />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}
