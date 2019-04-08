import React from "react";
import TransDocGraph from "./TransDocGraph/TransDocGraph";
import InfoCard from "../InfoCard/InfoCard";
import * as icons from "../BaseComponents/Icons/IconsDashboard";

let iconsArr = [
  icons.ProofOfExictanceIcon,
  icons.ProofOfAttributionIcon,
  icons.DownloadsIcon,
  icons.SharesIcon
];
console.log(iconsArr);
let data = [
  {
    type: "existence",
    count: 18,
    attributes: {
      displayName: "Proofs of existence"
    }
  },
  {
    type: "attribution",
    count: 30,
    embeded: [
      {
        type: "given",
        count: 12
      },
      {
        type: "received",
        count: 18
      }
    ],
    attributes: {
      displayName: "Proofs of attribition"
    }
  },
  {
    type: "download",
    count: 94,
    attributes: {
      displayName: "Downloads"
    }
  },
  {
    type: "share",
    count: 20,
    attributes: {
      displayName: "Shares"
    }
  }
];
let colors = ["#34FFF3", "#5CE5DD", "#37D3CA", "#26BCB3"];

export default p => (
  <div className="dashboard-main">
    <div className="info-block">
      {data.map((el, ind) => (
        <div key={ind} className="info-block__cell">
          <InfoCard
            advanced={true}
            color={colors[ind]}
            num={el.count}
            text={el.attributes.displayName.toUpperCase()}
            dop={!el.embeded ? false : el.embeded.map(el => ({
              num: el.count,
              text: el.type.substr(0,1).toUpperCase() + el.type.substr(1),
              color: "#5CE5DD"
            }))}
            icon={iconsArr[ind]()}
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
