import React, {Component} from "react";
import PropTypes from 'prop-types';

import BubbleChartView from "./BubbleChartView"
import BubbleChartDocs from "./BubbleChartDocs"

import "./_BubbleChart.scss"


class BubbleChart extends Component {
    
    state = {currentKey: "Healthcare"}
    
    setCurrent = (id) => {
        this.setState({currentKey: id})
    }

    render() {
        const {data} = this.props
        const dataToSHow = data.map(item => {return ({...item, v: item.count})})
                                .filter(item => item.count > 100)
        return (
            <div className = "chart-box" >
                <h3 className = "chart-title" >
                    KEYWORDS AND DOCUMENTS
                </h3>
                <div className = "keychart-box" >
                    <BubbleChartView data={dataToSHow} setCurrent = {this.setCurrent} />
                    <BubbleChartDocs data={dataToSHow.filter(item => item.key === this.state.currentKey)[0]}/>
                </div>
            </div>
        )
    }
}

BubbleChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
}
BubbleChart.defaultProps = {
    data: []
}

export default BubbleChart