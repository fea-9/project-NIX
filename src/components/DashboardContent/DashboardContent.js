import React, { Component }  from "react";
import TransDocGraph from "./TransDocGraph/TransDocGraph";
import BubbleChart from "./BubbleChart/BubbleChart"
import InfoCard from "../InfoCard/InfoCard";
import Spinner from "../Spinner/Spinner";
import Icon from "../BaseComponents/icon/index"
import { connect } from "react-redux";
import * as actions from "../actions/transDocGraph";
import {Copyright} from "../Copyright/Copyright"

let mapStateToProps = state => ({
  graph: state.transDocGraph,
  token: state.auth.user.access_token
});
let iconsArr = [
  <Icon className = "dashboard-menu-poe" type = "poeIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
  <Icon className = "dashboard-menu-poa" type = "mostCitedIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
  <Icon className = "dashboard-menu-downloads" type = "downloadsIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
  <Icon className = "dashboard-menu-share" type = "sharesIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
]
let colors = ["#34FFF3", "#5CE5DD", "#37D3CA", "#26BCB3"];
class DashboardContent extends Component {
  componentDidMount(){
    let token = localStorage.getItem("access_token");
    this.props.transDocRequest(token)
  }
  render(){
    let p = this.props
    console.log(p)
    return (
      <div className="dashboard-main">
        <div className="info-block">
          {p.spinner ? <Spinner procent={true} /> : p.data.map((el, ind) => (
            <div key={ind} className="info-block__cell">
              <InfoCard 
                advanced={true}
                color={colors[ind]}
                num={el.count}
                text={el.attributes.displayName.toUpperCase()}
                dop={
                  !el.embeded
                    ? false
                    : el.embeded.map(el => ({
                        num: el.count,
                        text:
                          el.type.substr(0, 1).toUpperCase() + el.type.substr(1),
                        color: "#5CE5DD"
                      }))
                }
                icon={iconsArr[ind]}
              />
            </div>
          ))}
        </div>
        <div className="graph-block">
          <div className="graph-block__cell">
            <div
              style={{ width: "100%", height: "100%", border: "1px solid black" }}
            >
              BubbleChart
            </div>
          </div>
          <div className="graph-block__cell">
            {
              p.graph.initial || p.graph.isFetching ? (
                <Spinner procent={true} />
              ) : p.graph.error ? (
                <h1>ERROR</h1>
              ) : (
                <TransDocGraph data={p.graph.data.data}/>
              )
            }
          </div>
        </div>
        <div className="dash-copyright">
          <Copyright />
        </div>
      </div>
    )
  }
};

DashboardContent =connect(mapStateToProps, {...actions})(DashboardContent)

export default DashboardContent
