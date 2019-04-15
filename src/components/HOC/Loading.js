import React from "react";
import PropTypes from "prop-types";

import Spinner from "../Spinner/Spinner";

export const Loading = ({ flag, children, procent = false }) =>
  flag ? <Spinner procent={procent} /> : children;

Loading.propTypes = {
  flag: PropTypes.bool,
  children: PropTypes.element
};
