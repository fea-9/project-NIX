import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import * as d3 from "d3";

class BubbleChartView extends Component {
    
    minValue = 1;
    maxValue = 100;
    mounted = false;
    
    state = {
        data: [],
        width: 0,
        height: 0
    };   

    componentDidUpdate(prevProps, prevState) {
        this.setSizes();
        if (prevState.width !== this.state.width ||
            prevState.height !== this.state.height)
            this.simulatePositions(this.props.data);
    }
    
    componentWillUnmount(){
        this.mounted = false;
        window.removeEventListener("resize", this.setSizes);
    }
   
    componentDidMount() {
        this.setSizes();
        window.addEventListener("resize", this.setSizes);
        this.mounted = true;
        if (this.props.data.length > 0 ) {

            this.minValue =
                0.5 *
                d3.min(this.props.data, item => {
                    return item.v;
                });

            this.maxValue =
                1.05 *
                d3.max(this.props.data, item => {                    
                    return item.v;
                });

            this.simulatePositions(this.props.data);
        }
    }
    
    setSizes = () => {
        if(!this.container) return;
        
        let currentWidth = this.container.offsetWidth;
        let currentHeight = this.container.offsetHeight;
        if (
            this.state.width !== currentWidth &&
            this.state.height !== currentHeight
        )
            this.setState(prevState => ({ 
                ...prevState,
                width: currentWidth, 
                height: currentHeight }));
    };

    radiusScale = value => { 
        const {width, height} = this.state
        const minSideSize = width < height ? width : height  
        const fx = d3
            .scaleSqrt()
            .range([1, (3200*minSideSize/this.maxValue)])
            .domain([this.minValue, this.maxValue]);
        return fx(value);
    };

    simulatePositions = data => {
       
        this.simulation = d3
            .forceSimulation()
            .nodes(data)
            // .velocityDecay(0.5)
            .force("x", d3.forceX().strength(0.05))
            .force("y", d3.forceY().strength(0.05))
            .force(
                "collide",
                d3.forceCollide(d => {
                    return this.radiusScale(d.v) + 2;
                })
                .strength(1)
                .iterations(1)
            ) 
            .on("tick", () => {
                if (this.mounted)
                    this.setState({ data });                
            })
    };


    onClick = (e) => {
        this.props.setCurrent(e.target.id
            .split("_").join(" ")
        )
    }

    renderBubbles = data => {
        // const {width, height} = this.props
        const {width, height} = this.state
        const color = "#5CE5DD";

        const texts = data.map((item, index) => {
            const fontSize = this.radiusScale(item.v)/3;
            const textLines = item.key.length > 10 && item.key.search(/\s/g) < 0 ? 
                [item.key.substr(0,item.key.length/2), item.key.slice(item.key.length/2)]
                : item.key.split(" ")
            return (
                <g
                    className = "node"
                    key={index}
                    transform={`translate(${width / 2 + item.x}, 
                        ${height / 2 + item.y})`}
                    onClick = {this.onClick}
                    onMouseEnter = {(d) => d3.select(`#${item.key.split(" ").join("_")}`)
                            .attr("r", this.radiusScale(item.v) + 1.5)}
                    onMouseLeave = {(d) => d3.select(`#${item.key.split(" ").join("_")}`)
                        .attr("r", this.radiusScale(item.v))}
                >
                    <circle
                        id = {item.key
                            .split(" ").join("_")
                            }
                        r = {this.radiusScale(item.v)}
                        fill = {item.v === this.maxValue/1.05 ? "url(#grad1)" : color}  
                                               
                    />
                    {fontSize > 10  && 
                        <text                             
                            fill="#fff"
                            textAnchor="middle"
                            fontSize={`${fontSize}px`}
                            fontWeight="bold"
                        >
                            {textLines.map( (word, index) => (
                                <tspan 
                                    id = {item.key}
                                    key = {index}
                                    x={0} 
                                    y={index === 0 && textLines.length === 1 ? `1rem`:`${index - textLines.length/2 - 1}px`} 
                                    dy={`${index * fontSize}px`}
                                >
                                        {word}
                                </tspan>
                            ))}
                        </text>
                    }
                    <title >
                        {item.key}
                    </title>                    
                </g>
            );
        });

        return texts;
    };
   
    render() { 
        const {data} = this.state
        // const { width, height} = this.props
        const {width, height} = this.state
        const {mobile} = this.props
        const minSideSize = width < height ? width : height

        if (data.length) {
            return (
                <div className = "keychart-view" 
                ref={el => (this.container = el)} 
                id = "view" >
                    <svg width={width} height={mobile ? minSideSize : height*0.9 } >
                        <defs>
                            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" style={{stopColor:"#03EFFE",
                                    stopOpacity:1}} />
                                <stop offset="60%" style={{stopColor:"#027478",
                                    stopOpacity:1}} />
                                <stop offset="95%" style={{stopColor:"#012724",
                                    stopOpacity:1}} />
                                <stop offset="100%" style={{stopColor:"#012724",stopOpacity:1}} />
                            </radialGradient>
                        </defs>
                        {this.renderBubbles(data)}
                    </svg>
                </div>
            );
        }

        return <div>ERROR</div>;
    }
}

BubbleChartView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    height: PropTypes.number,
    setCurrent: PropTypes.func,
    minimized: PropTypes.bool,
    mobile: PropTypes.bool
}

BubbleChartView.defaultProps = {
    data: [],
    width: 325,
    height: 385,
    setCurrent: () => {console.log("SetCurrent isn't set")}
};

const mapStateToProps = state => ({
    minimized: state.sidebar.minimized,
    mobile: state.resize.mobile
});

export default connect(mapStateToProps, null)(BubbleChartView);