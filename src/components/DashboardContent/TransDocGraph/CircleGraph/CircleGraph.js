import React, { useState } from 'react';
import "./CircleGraph.scss"

let data = [
   {
       key: "Reports",
       count: 380
   },
   {
       key: "Parents",
       count: 105
   },
   {
       key: "Articles",
       count: 350
   },
   {
       key: "Grants",
       count: 470
   },
   {
       key: "Data Sets",
       count: 380
   }
]

const ListItem = p => (
  <li style={{color: p.itemColor}} className={p.classItem}>
    <span className={p.classItem + "__text"}>
      {p.text}
    </span>
    <span className={p.classItem + "__num"}>
      {p.num}
    </span>
  </li>
)

export default p => {
  const colors = ['#03EFFE', '#34FFF3', '#5CE5DD', '#37D3CA', '#26BCB3']
  let nameKey = "key"
  let valueKey = "count"
  let sum = data.reduce((prev, el)=> prev += el[valueKey],0)
  let colorChange = num => num>= colors.length ? colors[num - colors.length] : colors[num]

  let createViewData = () => {
    const viewData = [...data]
    let i = 0
    while( i < viewData.length ){
      viewData[i].percent =  ((viewData[i][valueKey] /(sum / 100)) / 100)
      viewData[i].color = colorChange(i)
      i++
    }
    i = 0
    let nLength = viewData.length * 2
    while( i < nLength){
      if( i %2 ){
        viewData.splice(i,0,{ percent: 0.003, color: '#fff' })
      }
      i++
    }
    return viewData
  }
  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }
  console.log(createViewData(), sum)
  return (
    <div className="circle-graph">
      <div className="circle-graph__info">
        <ul>
          {data.map((el, ind)=> (
            <ListItem classItem = {"line"}
                      itemColor={colorChange(ind)}
                      text={el[nameKey]}
                      num={el[valueKey]}/>
          ))}
        </ul>
      </div>
      <svg viewBox = "-1 -1 2 2" style = {{transform: " rotate(-90deg)"}} height="55%" >
        {
          createViewData().map((slice, ind) => {
            // destructuring assignment sets the two variables at once
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

            // each slice starts where the last slice ended, so keep a cumulative percent
            cumulativePercent += slice.percent;

            const [endX, endY] = getCoordinatesForPercent(cumulativePercent)

            // if the slice is more than 50%, take the large arc (the long way around)
            const largeArcFlag = slice.percent > .5 ? 1 : 0

          	// create an array and join it just for code readability
            let pathData = [
              `M ${startX} ${startY}`, // Move
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
              `L 0 0`, // Line
            ].join(' ');
            console.log(pathData, slice.color)
            return (<path key={ind} d={pathData} fill={slice.color}/>)
          })
        }
        <circle cx={0} cy={0} r={0.65} style={{fill:"#fff"}}/>
        <text x={0} y = {0}
              textAnchor = "middle"
              fontSize={"0.2px"}
              style = {{transform: " rotate(90deg)"}}
              fill="#000"
              className="sum-text">
              {sum}
        </text>
      </svg>
    </div>
  )
}
