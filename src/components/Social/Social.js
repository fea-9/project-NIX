import React from "react";

// import * as Icons from "../BaseComponents/my-Icons";
import * as Icons from '../BaseComponents/Icons/IconsSideBar'

export const Social = props => (
  <div className="social-wrapper">
    <ul
      className={
        props.minimized 
          ? "social-list social-list_minimized"
          : "social-list"
      }
    >
      <li className="social-list-item">
        <a href="https://www.facebook.com/" target="_blank"  rel ="noopener noreferrer">
          {<Icons.Facebook className="social-icon facebook-icon" />}
        </a>
      </li>
      <li className="social-list-item">
        <a href="https://twitter.com/" target="_blank"  rel ="noopener noreferrer">
          {<Icons.Twitter className="social-icon twitter-icon" />}
        </a>
      </li>
      <li className="social-list-item">
        <a href="https://www.youtube.com/" target="_blank" rel ="noopener noreferrer" >
          {<Icons.Youtube className ="social-icon youtube-icon"/>}
        </a>
      </li>
    </ul>
  </div>
);
