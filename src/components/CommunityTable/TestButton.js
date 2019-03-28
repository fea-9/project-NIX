import React from "react"
import "./index.scss"

export default ({text, link, event})=>{
    let bComponent = null;

    if(!link){
        bComponent = <button className = "form-button">{text}</button>
    }
    else {
        bComponent = <a className = "button" href={link} onclick = {event}>{text}</a>
    }
    return (
        bComponent
    )
}
