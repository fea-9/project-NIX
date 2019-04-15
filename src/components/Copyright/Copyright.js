import React from "react";

export const Copyright = props => {
  const year = new Date().getFullYear();

  const { searchClass } = props;

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
};
