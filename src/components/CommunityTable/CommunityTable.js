import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";

import Button from "../BaseComponents/Button";
import getFullMonthDate from "../../utils/getFullMonthDate";
import { NavLink } from "react-router-dom";

import AvaMock from './AvaMock';


let InfoBlock = p => (
  <div className={p.className}>
    <div className={p.className + "__num"}>{p.num}</div>
    <div className={p.className + "__text"}>{p.text}</div>
  </div>
);

InfoBlock.propTypes = {
  className: PropTypes.string,
  num: PropTypes.number,
  text: PropTypes.string
};

export default class CommunityTable extends Component {
  static propTypes = {
    title: PropTypes.number,
    data: PropTypes.array,
    mobile: PropTypes.bool
  };
  render() {
    const mobile = this.props.mobile ? "-mobile" : "";
    return (
      <div className={`community-table${mobile}`}>
        <div className={`community-table${mobile}__total-info`}>
          {this.props.title} People community
        </div>
        <div className={`community-table${mobile}__main`}>
          <Scrollbars>
            {this.props.data.map((user, index) => {
              return (
                <div key={index} className={`table-line${mobile}`}>
                  <div className={`table-line${mobile}__ava`}>
                    <AvaMock text={user.memberName} />
                  </div>
                  <div className={`table-line${mobile}__info`}>
                    <div className={`table-line${mobile}__info__name`}>
                      {user.memberName}
                    </div>
                    <div className={`table-line${mobile}__info__since`}>
                      Member since {getFullMonthDate(user.memberCreatedDate)}
                    </div>
                  </div>
                  <InfoBlock
                    className={`table-line${mobile}__block`}
                    num={user.memberProofOfExistence}
                    text={"TOTAL PROOFS OF EXISTENCE"}
                  />
                  <InfoBlock
                    className={`table-line${mobile}__middle-block`}
                    num={user.memberProofOfAttribution}
                    text={"TOTAL PROOFS OF ATTRIBUTION"}
                  />
                  <InfoBlock
                    className={`table-line${mobile}__block`}
                    num={user.memberCitations}
                    text={"TOTAL CITATIONS"}
                  />
                  <div className={`table-line${mobile}__bottom`}>
                    <NavLink
                      to={`/community?${user.memberName}_${user.memberId}`}
                    >
                      <Button children="View" className="btn-community" />
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </Scrollbars>
        </div>
      </div>
    );
  }
}
