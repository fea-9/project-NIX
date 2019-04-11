import React from "react";

export const Logo = ({ minimized, className, button }) => (
  <h1 className={minimized ? `${className} ${className}_minimized` : className}>
    {button}
    {minimized ? "L" : "Logo"}
  </h1>
);
