import React from "react";
import TransDocGraph from "./TransDocGraph/TransDocGraph";
import InfoCard from "../InfoCard/InfoCard";
import Spinner from "../Spinner/Spinner";
import Icon from "../BaseComponents/icon/index"

export default p => {
  let colors = ["#34FFF3", "#5CE5DD", "#37D3CA", "#26BCB3"];
  let iconsArr = [
    <Icon className = "dashboard-menu-poe" type = "poeIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
    <Icon className = "dashboard-menu-poa" type = "mostCitedIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
    <Icon className = "dashboard-menu-downloads" type = "downloadsIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
    <Icon className = "dashboard-menu-share" type = "sharesIcon" width = {20} height = {20} viewBox="0 0 20 20"/>,
  ]

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
          <TransDocGraph />
        </div>
      </div>
    </div>
  );
};
