import React, { Component } from "react";
import TransDocGraph from "./TransDocGraph/TransDocGraph";
import BubbleChart from "./BubbleChart/BubbleChart";
import InfoCard from "../InfoCard/InfoCard";
import Spinner from "../Spinner/Spinner";
import Icon from "../BaseComponents/icon/index";
import { connect } from "react-redux";
import * as actions from "../actions/transDocGraph";
import { Copyright } from "../Copyright/Copyright";
import Error from "../Error/Error";
import PropTypes from "prop-types";
import CustomScrollbars from "react-custom-scrollbars";

let mapStateToProps = state => ({
  graph: state.transDocGraph,
  mobile: state.resize.mobile
});
let iconsArr = [
  <Icon
    className="dashboard-menu-poe"
    type="poeIcon"
    width={20}
    height={20}
    viewBox="0 0 20 20"
  />,
  <Icon
    className="dashboard-menu-poa"
    type="mostCitedIcon"
    width={20}
    height={20}
    viewBox="0 0 20 20"
  />,
  <Icon
    className="dashboard-menu-downloads"
    type="downloadsIcon"
    width={20}
    height={20}
    viewBox="0 0 20 20"
  />,
  <Icon
    className="dashboard-menu-share"
    type="sharesIcon"
    width={20}
    height={20}
    viewBox="0 0 20 20"
  />
];
let colors = ["#34FFF3", "#5CE5DD", "#37D3CA", "#26BCB3"];
export class DashboardContent extends Component {
  static propTypes = {
    graph: PropTypes.object,
    mobile: PropTypes.bool
  };
  componentDidMount() {
    const { getTransDoc } = this.props;
    getTransDoc();
  }
  render() {
    const p = this.props;
    const mobile = p.mobile ? "-mobile" : "";
    return (
      <div className={`dashboard-main${mobile}`}>
        <CustomScrollbars autoHide={true}>
          <div className={`info-block${mobile}`}>
            {p.spinner ? (
              <Spinner procent={true} />
            ) : (
              p.data.map((el, ind) => (
                <div key={ind} className={`info-block${mobile}__cell`}>
                  <InfoCard
                    advanced={true}
                    mobile={p.mobile}
                    color={colors[ind]}
                    num={el.count}
                    text={el.attributes.displayName.toUpperCase()}
                    dop={
                      !el.embeded
                        ? []
                        : el.embeded.map(el => ({
                            num: el.count,
                            text:
                              el.type.substr(0, 1).toUpperCase() +
                              el.type.substr(1),
                            color: "#5CE5DD"
                          }))
                    }
                    icon={iconsArr[ind]}
                  />
                </div>
              ))
            )}
          </div>
          <div className={`graph-block${mobile}`}>
            <div className={`graph-block${mobile}__cell`}>
              {p.graph.initial || p.graph.isFetching ? (
                <Spinner procent={true} />
              ) : p.graph.error ? (
                <Error />
              ) : (
                <BubbleChart data={p.graph.data} />
              )}
            </div>
            <div className={`graph-block${mobile}__cell`}>
              {p.graph.initial || p.graph.isFetching ? (
                <Spinner procent={true} />
              ) : p.graph.error ? (
                <Error />
              ) : (
                <TransDocGraph data={p.graph.data} />
              )}
            </div>
          </div>
          <div className={`dash-copyright${mobile}`}>
            <Copyright />
          </div>
        </CustomScrollbars>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { ...actions }
)(DashboardContent);
