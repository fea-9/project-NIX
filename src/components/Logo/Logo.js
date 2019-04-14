import React from "react";
import PropTypes from "prop-types";

export const Logo = ({ minimized, className, button }) => (
  <h1 className={minimized ? `${className} ${className}_minimized` : className}>
    {button}
    {minimized ? "L" : "Logo"}
  </h1>
);

Logo.propTypes = {
  minimized: PropTypes.bool,
  className: PropTypes.string,
  button: PropTypes.oneOfType([PropTypes.element, PropTypes.bool])
};
