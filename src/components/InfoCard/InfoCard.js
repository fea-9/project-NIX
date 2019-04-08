import React from "react";

export default ({ advanced, color, num, text, icon, dop }) => (
  <div className={"info-card " + (advanced ? "info-card--adv" : "")}>
    <div
      className={"info-card-title " + (advanced ? "info-card-title--adv" : "")}
    >
      <span className="num" style={{ color: color }}>
        {num}
      </span>
      {dop && (
        <div className="info-card-dop">
          {dop.map((el, ind) => (
            <div key = {ind} className="info-card-dop__line">
              <span style={{ color: el.color }}>{el.num}</span>
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    <div
      className={"info-card-text " + (advanced ? "info-card-text--adv" : "")}
    >
      {icon}
      <span>{text}</span>
    </div>
  </div>
);
