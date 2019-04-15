import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import "./CircleGraph.scss";
import PropTypes from "prop-types";

class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
        renderTrackVertical={props => <div {...props} className="track-vertical"/>}
        renderThumbHorizontal={props => <div {...props} className="thumb-horizontal"/>}
      >
        {this.props.children}
      </Scrollbars>
    );
  }
}
export default class CircleGraph extends Component {
  state = {
    displayValue: 0,
    displayInd: -1
  };

  static propTypes = {
    data: PropTypes.array,
    valueKey: PropTypes.string,
    nameKey: PropTypes.string,
    mobile: PropTypes.bool,
    height: PropTypes.oneOfType (
      [
        PropTypes.string,
        PropTypes.number
      ]
    )
  }

  getDataSum = (data, key) => data.reduce((prev, el) => (prev += el[key]), 0);

  componentDidMount() {
    this.setState({
      displayValue: this.getDataSum(this.props.data, this.props.valueKey)
    });
  }

  mouseOverHandler = (val, ind) => e => {
    if (!val) return;
    this.setState({ displayValue: val, displayInd: ind });
  };
  mouseOutHandler = val => e => {
    this.setState({ displayValue: val, displayInd: -1 });
  };


  render() {
    const { data, valueKey, height, nameKey, mobile} = this.props;
    const colors = ["#03EFFE", "#34FFF3", "#5CE5DD", "#37D3CA", "#26BCB3"];
    const sum = this.getDataSum(data, valueKey);
    const colorChange = num => colors[num % colors.length];
    const classMob = mobile ? "-mobile" : ""
 
    const createViewData = () => {
      const viewData = [...data];
      let i = 0;
      while (i < viewData.length) {
        viewData[i].percent = viewData[i][valueKey] / (sum / 100) / 100;
        viewData[i].color = colorChange(i);
        viewData[i].indificator = i;
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
      <div className={`circle-graph${classMob}`}>
        <div className={`graph-info${classMob}`}>
          <div className={`graph-list${classMob}`}>
            <CustomScrollbars >
              {data.map((el, ind) => {
                return (
                  <div
                    key={ind}
                    style={{
                      backgroundImage:
                        this.state.displayInd === ind
                          ? " linear-gradient(to right, #fff,#34fff3)"
                          : ""
                    }}
                    className={"line"}
                    onMouseOver={this.mouseOverHandler(el[valueKey], ind)}
                    onMouseOut={this.mouseOutHandler(sum)}
                  > 
                    <span className="line__dot" style={{background: colorChange(ind)}}></span>
                    <span className={"line__text"}>{el[nameKey]}</span>
                    <span className={"line__num"}>{el[valueKey]}</span>
                  </div>
                );
              })}
            </CustomScrollbars>
          </div>
        </div>
        <svg
          viewBox="-1 -1 2 2"
          style={{ transform: " rotate(-90deg)" }}
          height={height}
        >
          {createViewData().map((slice, ind) => {
            const [startX, startY] = getCoordinatesForPercent(
              cumulativePercent
            );

            cumulativePercent += slice.percent;

            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

            const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

            let pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`
            ].join(" ");
            return (
              <path
                key={ind}
                d={pathData}
                fill={
                  slice.indificator === this.state.displayInd
                    ? "#04332f"
                    : slice.color
                }
                onMouseOver={this.mouseOverHandler(
                  slice[valueKey],
                  slice.indificator
                )}
                onMouseOut={this.mouseOutHandler(sum)}
              />
            );
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
            {this.state.displayValue}
          </text>
        </svg>
      </div>
    );
  }
}
