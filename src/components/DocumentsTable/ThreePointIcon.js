import React, { useState } from 'react';

export default props => {
  const [clicked, toggle] = useState (false)

  const clickHandler = e => {
    toggle(!clicked)
  }

  if(!clicked) return (
    <span className="threePointIcon" onClick = {clickHandler} >&bull;&bull;&bull;</span>
  )
  return (
    props.data.map((el, ind) => (
      <span className="threePointIcon" key={el + ind} onClick = {clickHandler}>{el}</span>
    ))
  )
}
