import React from "react";

export default ({ procent }) => (
  <div className={procent ? "spinner spinner_procent" : "spinner"}>
    <div className="boxes">
      <div className="box">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="box">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="box">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="box">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);
