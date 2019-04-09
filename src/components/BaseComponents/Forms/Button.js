import React from "react";

export const Button = ({ text, type = "button", className, onClick }) => (
  <button type={type} className={className} onClick={onClick}>
    {text}
  </button>
);
