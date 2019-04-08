import React from 'react';



export default ({text}) => {
    const getRand = () => {
        let num =Math.round(Math.random()*255)
        let upNum = num.toString(16)
        return upNum.length === 1 ? "0" + upNum : upNum
    }
    const getInitials = name => name.split(" ")
                    .reduce( (prev, el ) => prev += el[0].toUpperCase() ,"")
    return (
        <div 
            style={
                { 
                    width: "78px", 
                    height: "78px", 
                    borderRadius: "50%",
                    background: `#${getRand()}${getRand()}${getRand()}`,
                    display: "flex",
                    jusifyContent: "center",
                    alignItems: "center"
                }
            }>
            <div style={{fontSize: "28px", color: "#fff", fontWeight: 700, textAlign: "center", width: "100%"}}>
                {getInitials(text)}
            </div>
        </div>
    )
}