import React, { Component } from "react";
import StandartGraph from "./StandartGraph/StandartGraph.js";
import CircleGraph from "./CircleGraph/CircleGraph.js";
import Button from "../../BaseComponents/Button";
import ButtonGroup from "../../BaseComponents/ButtonGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

let mapStateToProps = state => ({
  minimized: state.sidebar.minimized,
  mobile: state.resize.mobile
});

class TransDocGraph extends Component {
  state = {
    view: false,
    width: 0,
    height: 0
  };
  static propTypes = {
    minimized: PropTypes.bool,
    mobile: PropTypes.bool
  }
  componentDidMount() {
    this.setSizes();
    window.addEventListener("resize", this.setSizes);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.minimized !== this.props.minimized) this.setSizes();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setSizes);
  }
  setSizes = () => {
    if (!this.container) return;
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
    const s = this.state;
    const p = this.props;
    const classMob = p.mobile ? "-mobile" : "";
    return (
      <div className="tr-doc-graph">
        <div className={`graph-panel${classMob}`}>
          <h3>TRANSACTED PROJECTS AND DOCUMENTS</h3>
          <div className="fix-btn-group">
            <ButtonGroup>
              <Button onClick={this.toggleView(false)} active={!s.view}>
                POA
              </Button>
              <Button onClick={this.toggleView(true)} active={s.view}>
                POE
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className={`graph-view${classMob}`} ref={el => (this.container = el)}>
          {s.view ? (
            <StandartGraph
              data={p.data}
              nameKey={"key"}
              valueKey={"count"}
              width={ s.width }
              height={p.mobile? s.width : s.height * 0.8}
              mobile={p.mobile}
            />
          ) : (
            <CircleGraph
              data={p.data}
              nameKey={"key"}
              valueKey={"count"}
              height={
                p.mobile
                  ? s.height > s.width ? s.width
                  : s.height * 5 : p.minimized ? 
                  s.height * 0.7 : s.width * 0.7
              }
              mobile={p.mobile}
            />
          )}
        </div>
      </div>
    );
  }
}

TransDocGraph = connect(
  mapStateToProps,
  {}
)(TransDocGraph);

export default TransDocGraph;
