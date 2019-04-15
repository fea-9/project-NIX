import React from "react";
import PropTypes from "prop-types";

import Spinner from "../Spinner/Spinner";

export const Loading = ({ flag, children }) => (flag ? <Spinner /> : children);

Loading.propTypes = {
  flag: PropTypes.element,
  children: PropTypes.element
};
