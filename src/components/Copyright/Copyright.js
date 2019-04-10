import React from "react";

export const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="copyright">
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
