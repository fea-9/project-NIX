import React, { Component } from 'react';
import {PageTemplate} from '../Templates/PageTemplate';
import Sidebar from '../Sidebar/Sidebar';
import DashboardContent from "../DashboardContent/DashboardContent"


class DashboardPage extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <PageTemplate sidebar={<Sidebar/>} content={<DashboardContent />} />
        )
    }
}

export default DashboardPage;
