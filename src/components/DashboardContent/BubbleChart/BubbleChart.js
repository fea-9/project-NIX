import React, {Component} from "react";
import PropTypes from 'prop-types';

import BubbleChart2 from "./BubbleChartView"
import DocumentsList from "./BubbleChartDocs"

import {serverData} from './tempData'

import "./_BubbleChart.scss"


const rawdata = serverData.map(item => ({...item, v: item.count})).filter(item => item.count > 100)

class ChartBox extends Component {
    
    state = {currentKey: "Healthcare"}

    setCurrent = (id) => {
        this.setState({currentKey: id})
    }

    render() {
        return (
            <div className = "chart-box" >
                <h3 className = "chart-title" >
                    KEYWORDS AND DOCUMENTS
                </h3>
                <div className = "keychart-box" >
                    <BubbleChart2 data={rawdata} setCurrent = {this.setCurrent} />
                    <DocumentsList data={rawdata.filter(item => item.key === this.state.currentKey)[0]}/>
                </div>
            </div>
        )
    }
}

ChartBox.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
}
ChartBox.defaultProps = {
    data: []
}

export default ChartBox