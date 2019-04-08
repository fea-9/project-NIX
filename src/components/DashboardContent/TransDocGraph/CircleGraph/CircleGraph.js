import React, { useState } from "react";
import "./CircleGraph.scss";


const List = ({data,keyText, keyNum}) => {
  return (
    <ul>
      {
        data.map((el, ind) => (
          <li key={ind} style={{ color: el.color }} className={"line"}>
            <span className={"line__text"}>{el[keyText]}</span>
            <span className={"line__num"}>{el[keyNum]}</span>
          </li>
        ))
      }
    </ul>
  )
}

export default ({ nameKey, valueKey, data, height = "50%" }) => {
  const colors = ["#03EFFE", "#34FFF3", "#5CE5DD", "#37D3CA", "#26BCB3"];
  let sum = data.reduce((prev, el) => (prev += el[valueKey]), 0);
  let colorChange = num =>
    num >= colors.length ? colors[num - colors.length] : colors[num];

  let createViewData = () => {
    const viewData = [...data];
    let i = 0;
    while (i < viewData.length) {
      viewData[i].percent = viewData[i][valueKey] / (sum / 100) / 100;
      viewData[i].color = colorChange(i);
      i++;
    }
    i = 0;
    let nLength = viewData.length * 2;
    while (i < nLength) {
      if (i % 2) {
        viewData.splice(i, 0, { percent: 0.003, color: "#fff" });
      }
      i++;
    }
    return viewData;
  };
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }
  return (
    <div className="circle-graph">
      <div className="graph-info">
        <List data={data.map((el, ind)=>{
          el.color = colorChange(ind)
          return el
        })}
          keyText = "key"
          keyNum = "count"/>
      </div>
      <svg
        viewBox="-1 -1 2 2"
        style={{ transform: " rotate(-90deg)" }}
        height={height}
      >
        {createViewData().map((slice, ind) => {
          // destructuring assignment sets the two variables at once
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

          // each slice starts where the last slice ended, so keep a cumulative percent
          cumulativePercent += slice.percent;

          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

          // if the slice is more than 50%, take the large arc (the long way around)
          const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

          // create an array and join it just for code readability
          let pathData = [
            `M ${startX} ${startY}`, // Move
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
            `L 0 0` // Line
          ].join(" ");
          return <path key={ind} d={pathData} fill={slice.color} />;
        })}
        <circle cx={0} cy={0} r={0.65} style={{ fill: "#fff" }} />
        <text
          className="sumText"
          x={0}
          y={0 + 0.1}
          textAnchor="middle"
          fontSize={"0.3px"}
          style={{ transform: " rotate(90deg)" }}
          fill="#000"
          className="sum-text"
        >
          {sum}
        </text>
      </svg>
    </div>
  );
};
