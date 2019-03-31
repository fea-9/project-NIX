import React, { Component } from 'react';
import StandartGraph from "./StandartGraph/StandartGraph.js"

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

export default class TransDocGraph extends Component {
  render(){
    return(
      <div className="tr-doc-graph">
        <h1>Coming soon...</h1>
        <StandartGraph data={data} nameKey={"key"} valueKey={"count"}/>
      </div>
    )
  }
}
