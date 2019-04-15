import React from "react";
import Spinner from "../Spinner/Spinner";

import PropTypes from "prop-types";

export const Loading = ({ flag, children }) => (flag ? <Spinner /> : children);

Loading.propTypes = {
  flag: PropTypes.bool,
  children: PropTypes.element
};
