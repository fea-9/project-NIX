import React from "react";

export const Logo = ({minimized, text = "Logo", ...props}) => (
  <h1 {...props}>{minimized ? "L" : text}</h1>
);
