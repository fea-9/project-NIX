import React from "react";
import PropTypes from "prop-types";

const InfoCard = ({ advanced, color, num, text, icon, dop, mobile}) => {
  const dopClass =( advanced ? "--adv" : "" ) + ( mobile ? "--mob" : "")
  return (
    <div className={"info-card" + dopClass}>
      <div
        className={"info-card-title" + dopClass}
      >
        <span className="num" style={{ color: color }}>
          {num}
        </span>
        {dop && (
          <div className="info-card-dop">
            {dop.map((el, ind) => (
              <div key = {ind} className="info-card-dop__line">
                <span style={{ color: el.color }}>{el.num}</span>
                <span>{el.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className={"info-card-text" + dopClass}
      >
        {icon}
        <span>{text}</span>
      </div>
    </div>
  )
}

InfoCard.propTypes = {
  advanced: PropTypes.bool,
  color: PropTypes.string,
  num: PropTypes.number,
  icon: PropTypes.func,
  dop: PropTypes.array,
  mobile: PropTypes.bool
}

export default InfoCard