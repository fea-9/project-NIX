import React from "react";

export const Button = ({ text, type = "button", ...rest }) => (
  <button type={type} {...rest}>
    {text}
  </button>
);
