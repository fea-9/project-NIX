import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
//test
import TestButton from "../DocumentsTable/TestButton";

import getFullMonthDate from "../../utils/getFullMonthDate";

import avaMock from "./AvaMock"
import AvaMock from './AvaMock';


let InfoBlock = p => (
  <div className={p.className}>
    <div className={p.className + "__num"}>
      {p.num}
    </div>
    <div className={p.className + "__text"}>
      {p.text}
    </div>
  </div>
)


export default class CommunityTable extends Component {

  render(){

    return(
      <div className="community-table">
        <div className="community-table__total-info">
          {this.props.title} People community
        </div>
          <div className="community-table__main">
            <Scrollbars>
                {
                  this.props.data.map ((user, index) => {
                    return (
                      <div key={index} className="table-line">
                            <AvaMock text={user.memberName}/>
                            <div className="table-line__info">
                              <div className="table-line__info__name">
                                {user.memberName}
                              </div>
                              <div className="table-line__info__since">
                                Member since {getFullMonthDate(user.memberCreatedDate)}
                              </div>
                            </div>
                            <InfoBlock className="table-line__block"
                              num={user.memberProofOfExistence}
                              text={"TOTAL PROOFS OF EXISTENCE"}
                            />
                            <InfoBlock className="table-line__middle-block"
                              num={user.memberProofOfAttribution}
                              text={"TOTAL PROOFS OF ATTRIBUTION"}
                            />
                            <InfoBlock className="table-line__block"
                              num={user.memberCitations}
                              text={"TOTAL CITATIONS"}
                            />
                            <TestButton text="View"/>
                      </div>
                    )
                  })
              }
            </Scrollbars>
          </div>
      </div>
    )
  }
}
