import React, { useState } from 'react';
import PropTypes from "prop-types";

const ThreePointIcon = ({data}) => {
  const [clicked, toggle] = useState (false)
 
  const clickHandler = e => {
    toggle(!clicked)
  }
  if(!clicked) return (
    <span className="threePointIcon" onClick = {clickHandler} >&bull;&bull;&bull;</span>
  )
  return (
    data.map((el, ind) => (
      <span className="threePointIcon" key={el + ind} onClick = {clickHandler}>{el}</span>
    ))
  )
}

ThreePointIcon.propTypes = {
  data: PropTypes.array.isRequired
}

export default ThreePointIcon