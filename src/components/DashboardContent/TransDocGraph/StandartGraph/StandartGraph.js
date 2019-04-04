import React, { useState } from 'react';
// import "./StandartGraph.scss"

export default p =>  {
  const {
    data, 
    nameKey,
    valueKey, 
    width = 500, 
    height = 400, 
    gap = 20, 
    textHeight = 12
  } = {...p}

  if(!nameKey || !valueKey || !data){
    console.error("not set nameKey || valueKey || data")
    return <p>ERROR</p>
  }

  const [state, addInfo] = useState ({foc: false, y: 0, x: 0, val: 0})
  let act = (toggle, newY, newX, newVal) => addInfo({foc: true, y: newY, x: newX, val: newVal})
  let deAct = () => addInfo({foc: false })


  let maxVal = Math.max(...data.map(el => el[valueKey]))
  let numRank = maxVal.toString().substr(1).length
  let stepInd = +("1" + "e" + numRank)
  let maxInd =  Math.ceil(maxVal/stepInd) * stepInd

  let indent = (()=>{
    let result = 25
    let i = 2
    while(i++ <= numRank) result += 7
    return result
  })()
  let workY = height - indent
  let workX = width - indent - (gap * data.length)
  let graphPx = (height - indent )/ maxInd
  let rectStep = workX / data.length
  let rectStartPos = indent + gap
  let rectProgress = 0

  let indArr = (()=>{
    let res = []
    let i = maxInd
    while(i >= 0){
      res.push(i)
      i-= stepInd
    }
    let workStep =( workY - textHeight) / (res.length - 1)
    let progress = textHeight
    return res.map((num, ind) => ({val: num, pos: !ind ? progress :progress += workStep}))
  })()

  return(
    <div className="standart-graph">
      <svg width={width} height={height}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:"#03EFFE", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#276763", stopOpacity:1}} />
        </linearGradient>
      </defs>
        <line x1={indent} y1={0} x2={indent}
              y2={height - indent}
              style={{stroke:"#7B8180",strokeWidth:"2"}} />
        <line x1={indent} y1={height - indent}
              x2={width} y2={height - indent}
              style={{stroke:"#7B8180",strokeWidth:"2"}} />
        {indArr.map((el, ind, arr) => {
          return (
            <text x={indent - 2}
                  textAnchor = "end"
                  y = {el.pos}
                  fill="#7B8180">
                  {el.val}
            </text>
          )
        })}
        {
          data.map(el => {
            let indFromAbove = workY - (el[valueKey] * graphPx)
            !rectProgress ? rectProgress += rectStartPos
              : rectProgress += rectStep + gap
            let textCoord = rectProgress + (rectStep/2)
            return(
              <>
                <rect onMouseMove = {e=>
                        {
                          act(
                                true,
                                indFromAbove,
                                textCoord ,
                                el[valueKey]
                              )
                        }
                      }
                      onMouseOut = { e => {deAct()}}
                      x={rectProgress} y={indFromAbove}
                      fill={"url(#grad1)"} width={rectStep}
                      height={height - indent - indFromAbove}
                      style={{strokeWidth:5,strokeOpacity:0.9}} />

                <text x={textCoord }
                      textAnchor = "middle"
                      y = {workY + textHeight + 5}
                      fill="#7B8180">
                      {el[nameKey]}
                </text>
              </>
            )
          })
        }
        {state.foc && 
          <>
            <line x1={indent} y1={state.y} x2={width}
                  y2={state.y}
                  style={{stroke:"#7B8180",strokeWidth:"2"}} />
            <text x={state.x}
                  textAnchor = "middle"
                  y = {state.y - 2}
                  fill="#7B8180">
                  {state.val}
            </text>
          </>
        }
      </svg>
    </div>
  )
}
