import React from "react";

import Icon from "../BaseComponents/icon/";

export const Social = props => (
  <ul
    className={
      props.minimized ? "social-list social-list_minimized" : "social-list"
    }
  >
    <li className="social-list-item">
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {
          <Icon
            className="social-icon facebook-icon"
            type="facebookIcon"
            width={30}
            height={30}
            viewBox="0 0 30 30"
          />
        }
      </a>
    </li>
    <li className="social-list-item">
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
        {
          <Icon
            className="social-icon facebook-icon"
            type="twitterIcon"
            width={30}
            height={30}
            viewBox="0 0 30 30"
          />
        }
      </a>
    </li>
    <li className="social-list-item">
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {
          <Icon
            className="social-icon facebook-icon"
            type="youtubeIcon"
            width={30}
            height={30}
            viewBox="0 0 30 30"
          />
        }
      </a>
    </li>
  </ul>
);
