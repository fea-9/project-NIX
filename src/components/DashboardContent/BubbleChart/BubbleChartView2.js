import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class BubbleChart2 extends Component {
    
    componentDidMount() {
        this.svg = ReactDOM.findDOMNode(this);
        
        this.renderChart();
        
    }

    componentDidUpdate() {
        const { width,height} = this.props;
        if(width !== 0 && height !== 0) {
            // Reset the svg element to a empty state.
            this.svg.innerHTML = `` ;
            this.renderChart();
        }
    }

    gradient = () => {
        return (
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
        )
    }
        

    render() {
        const {width,height} = this.props;
        return (
            <svg className = "keychart-view"
                width={width} height={height} >
            </svg>            
        )
    }

    renderChart= () => {
        // console.log(this.props)
        const {
            graph,
            data,
            height,
            width,
            color            
        } = this.props;
        
        this.svg.innerHTML = `<defs>
                                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                    <stop offset="0%" stop-color="#03EFFE" 
                                        stop-opacity=1 />
                                    <stop offset="60%" stop-color="#027478" 
                                        stop-opacity:1 />
                                    <stop offset="95%" stop-color="#012724"
                                        stop-opacity=1 />
                                    <stop offset="100%" stop-color="#012724" stop-opacity=1 />
                                </radialGradient>
                            </defs>` ;
        
        const pack = d3.pack()
            .size([width * graph.zoom, height * graph.zoom])
            .padding(3);

        // Process the data to have a hierarchy structure;
        const root = d3.hierarchy({children: data})
            .sum(function(d) { return d.v; })
            .sort(function(a, b) { return b.v - a.v; })
            .each((d) => {
                console.log(d)
                if(d.data.count) {
                    d.title = d.data.key;
                    d.label = d.data.key;
                    d.id = d.data.count;
                }
            });

        // Pass the data to the pack layout to calculate the distribution.
        const nodes = pack(root).leaves();

        // Call to the function that draw the bubbles.
        this.renderBubbles(width, nodes, color);       
    }

    
    renderBubbles= (width, nodes, color) => {
        // console.log("reder")
        const {
            data,
            valueFont,
            setCurrent
        } = this.props;
        const maxValue =            
            d3.max(data, item => {
                return item.v;
            });            
        // console.log(maxValue)

       
   
    const bubbleChart = d3.select(this.svg).append("g")
        .attr("class", "bubble-chart")   
    //   .attr("transform", function(d) { return "translate(" + (width * graph.offsetX) + "," + (width * graph.offsetY) + ")"; });;

    const node = bubbleChart.selectAll(".node")
        .data(nodes)
        .enter().append("g")
            .attr("class", "node")
            .attr("transform", (d) => { console.log(d)
                return "translate(" + d.x + "," + d.y + ")"; })
            .on("click", (d) => {
                setCurrent(d.label);
        });

    node.append("circle")
        .attr("id", (d) => { return d.id; })
        .attr("r", (d) => { return d.r - (d.r * .04); })
        .style("fill", (d) => { return d.value === maxValue ? "url(#grad1)" : color; })
        .style("z-index", 1)
        .on('mouseover', function (d) {
            d3.select(this).attr("r", d.r * 1.04);
        })
        .on('mouseout', function (d) {
            const r = d.r - (d.r * 0.04);
            d3.select(this).attr("r", r);
        });

    node.append("text")
            .attr("class", "value-text")
            .style("font-size", d => { return d.r/3 > 10 ? (`${d.r/3}px`) : "0px"})
            .attr("clip-path", (d) => { return "url(#clip-" + d.id + ")"; })
            .style("font-weight", (d) => {
                return valueFont.weight ? valueFont.weight : 800;
            })
            .style("font-family", valueFont.family)
            .style("fill", () => {
                return valueFont.color ? valueFont.color : '#000';
            })
            .style("stroke", () => {
                return valueFont.lineColor ? valueFont.lineColor : '#000';
            })
            .style("stroke-width", () => {
                return valueFont.lineWeight ? valueFont.lineWeight : 0;
            })
            .style("z-index", 10)
        
    d3.selectAll("text")
        .data(nodes)
        .selectAll("tspan")
        .data (d => {return d.label.length > 10 && d.label.search(/\s/g) < 0? 
            [d.label.substr(0,d.label.length/2), d.label.slice(d.label.length/2)]
            : d.label.split(" ")})
        .join("tspan")
          .attr("text-anchor", "middle")
          .attr("x", 0)              
          .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
          .text(d => d
               );

    // Center the texts inside the circles.
    d3.selectAll(".value-text")
        .attr("x", function (d) {
            const self = d3.select(this);
            const width = self.node().getBBox().width;
            return -(width/2);
        })
        .attr("y", (d) => {
            if (d.hideLabel) {
                return 
                // valueFont.size / 3;
            } else {
                return d.r * 0.1;
                // -valueFont.size * 0.5;
            }
        })
        
    node.append("title")
        .text((d) => { return d.title; })
        .attr("class", "chat-title");
  }

 
}


BubbleChart2.defaultProps = {
    graph: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
    },
    width: 325,
    height: 385,
    color: "#5CE5DD",   
    valueFont: {
        family: 'Arial',
        size: 16,
        color: '#fff',
        weight: 'bold',
    },
    setCurrent: (label) => {console.log(`Bubble ${label} is clicked ...`)},
}