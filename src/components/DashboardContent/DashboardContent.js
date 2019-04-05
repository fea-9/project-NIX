import React, { Component } from 'react';
import TransDocGraph from "./TransDocGraph/TransDocGraph"

export default p => (
  <div className="dashboard-main">
    <div className="info-block">
      <div className="info-block__cell">
        <div style={{width: "100%", height: "120px", border: "1px solid pink"}}>100</div>
        <div style={{width: "100%", height: "120px", border: "1px solid pink"}}>200</div>
      </div>
      <div className="info-block__cell">
        <div style={{width: "100%", height: "120px", border: "1px solid pink"}}>300</div>
        <div style={{width: "100%", height: "120px", border: "1px solid pink"}}>400</div>
      </div>
    </div>
    <div className="graph-block">
      <div className="graph-block__cell">
        <div style={{width: "100%", height: "100%", border: "1px solid black"}}>BubbleChart</div>
      </div>
      <div className="graph-block__cell">
        <TransDocGraph />
      </div>
    </div>
  </div>
)
