import React from 'react';
import "./TestSpiner.scss"

export default p => (
  <div style={p.full ?
    {
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }
    : {}}>
    <div className="boxes" style={!p.full ? {position: "absolute", top: "50%", left: "50%"} : {}}>
      <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
    </div>
  </div>
)
