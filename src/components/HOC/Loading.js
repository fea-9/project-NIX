import React from "react";
import Spinner from "../Spinner/Spinner";

export default ({ flag, children }) => (flag ? <Spinner /> : children);
