import React, { Component } from "react";
import PropTypes from "prop-types";
import "./StandartGraph.scss";

export default class StandartGraph extends Component {
  state = {
    foc: false,
    y: 0,
    x: 0,
    val: 0
  };
  static defaultProps = {
    width: 500,
    height: 400,
    textHeight: 12
  };
  static propTypes = {
    data: PropTypes.array,
    nameKey: PropTypes.string,
    valueKey: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    textHeight: PropTypes.number
  };

  act = (toggle, newY, newX, newVal) =>
    this.setState({ foc: true, y: newY, x: newX, val: newVal });
  deAct = () => this.setState({ foc: false });

  render() {
    let p = this.props;
    let s = this.state;
    console.log(p.width, p.height, "SIZES")
    let gap = (p.width * 0.3) / p.data.length;
    let maxVal = Math.max(...p.data.map(el => el[p.valueKey]));
    let numRank = maxVal.toString().substr(1).length;
    let stepInd = +("1" + "e" + numRank);
    let maxInd = Math.ceil(maxVal / stepInd) * stepInd;

    let indent = (() => {
      let result = 25;
      let i = 2;
      while (i++ <= numRank) result += 7;
      return result;
    })();

    let workY = p.height - indent/4;
    let workX = p.width - indent - gap * p.data.length;
    let graphPx = (p.height - indent) / maxInd;
    let rectStep = workX / p.data.length;
    let rectStartPos = indent + gap;
    let rectProgress = 0;

    let indArr = (() => {
      let res = [];
      let i = maxInd;
      while (i >= 0) {
        res.push(i);
        i -= stepInd;
      }
      let workStep = (workY - p.textHeight) / (res.length - 1);
      let progress = p.textHeight;
      return res.map((num, ind) => ({
        val: num,
        pos: !ind ? progress : (progress += workStep)
      }));
    })();

    return (
      <div className="standart-graph">
        <svg width={p.width} height={p.height}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#03EFFE", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#276763", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <line
            x1={indent}
            y1={0}
            x2={indent}
            y2={p.height - indent/4}
            style={{ stroke: "#7B8180", strokeWidth: "2" }}
          />
          <line
            x1={indent}
            y1={p.height - indent/4}
            x2={p.width}
            y2={p.height - indent/4}
            style={{ stroke: "#7B8180", strokeWidth: "2" }}
          />
          {indArr.map((el, ind, arr) => {
            return (
              <text 
                key={ind + "isg"}
                x={indent - 2}
                className="textLeft"
                textAnchor="end"
                y={el.pos}
                fill="#7B8180"
              >
                {el.val}
              </text>
            );
          })}
          {p.data.map((el, ind) => {
            let indFromAbove = workY - el[p.valueKey] * graphPx;
            !rectProgress
              ? (rectProgress += rectStartPos)
              : (rectProgress += rectStep + gap);
            let textCoord = rectProgress + rectStep / 2;
            return (
              <React.Fragment key={ind + "fr"}>
                <rect
                  key={ind + "sg"}
                  onMouseMove={e => {
                    this.act(true, indFromAbove, textCoord, el[p.valueKey]);
                  }}
                  onMouseOut={e => {
                    this.deAct();
                  }}
                  x={rectProgress}
                  y={indFromAbove}
                  fill={"url(#grad1)"}
                  width={rectStep}
                  height={p.height - indent/4 - indFromAbove}
                  style={{ strokeWidth: 5, strokeOpacity: 0.9 }}
                />

                <text
                  key={ind}
                  className="textBottom"
                  x={/*textCoord*/rectProgress - 2}
                  textAnchor="start"
                  transform={`rotate(270 ${/*textCoord*/ rectProgress - 2} ${workY - indent/2.5})`}
                  y={workY - indent/2.5/* + p.textHeight + 5*/}
                  fill="#7B8180"
                >
                  {el[p.nameKey]}
                </text>
              </React.Fragment>
            );
          })}
          {s.foc && (
            <>
              <line
                x1={indent}
                y1={s.y}
                x2={p.width}
                y2={s.y}
                style={{ stroke: "#7B8180", strokeWidth: "2" }}
              />
              <text
                className="textInfo"
                x={s.x}
                textAnchor="middle"
                y={s.y - 2}
                fill="#7B8180"
              >
                {s.val}
              </text>
            </>
          )}
        </svg>
      </div>
    );
  }
}
