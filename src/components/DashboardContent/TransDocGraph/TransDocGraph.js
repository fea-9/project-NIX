import React, { Component } from "react";
import StandartGraph from "./StandartGraph/StandartGraph.js";
import CircleGraph from "./CircleGraph/CircleGraph.js";
import Button from "../../BaseComponents/Button";
import ButtonGroup from "../../BaseComponents/ButtonGroup";

export default class TransDocGraph extends Component {
  state = {
    view: false,
    width: 0,
    height: 0
  };
  componentDidMount() {
    this.setSizes();
    window.addEventListener("resize", this.setSizes, true)
  }
  componentDidUpdate() {//ловим пропсы с сайдбара, если изменились то resize.
    this.setSizes();
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.setSizes)
  }
  setSizes = () => {
    let currentWidth = this.container.offsetWidth;
    let currentHeight = this.container.offsetHeight;
    if (
      this.state.width !== currentWidth &&
      this.state.height !== currentHeight
    )
      this.setState({ width: currentWidth, height: currentHeight });
  };

  toggleView = bol => e => {
    this.setState({ view: bol });
  };
  render() {
    let s = this.state;
    let p = this.props
    return (
      <div className="tr-doc-graph">
        <div className="graph-panel">
          <h3>TRANSACTED PROJECTS AND DOCUMENTS</h3>
          <ButtonGroup>
            <Button onClick={this.toggleView(false)} active={!s.view}>POA</Button>
            <Button onClick={this.toggleView(true)} active={s.view}>POE</Button>
          </ButtonGroup>
        </div>
        <div className="graph-view" ref={el => (this.container = el)}>
          {s.view ? (
            <StandartGraph
              data={p.data}
              nameKey={"key"}
              valueKey={"count"}
              width={s.width}
              height={s.height * 0.95}
            />
          ) : (
            <CircleGraph
              data={p.data}
              nameKey={"key"}
              valueKey={"count"}
              height={s.height * 0.8}
            />
          )}
        </div>
      </div>
    );
  }
}
