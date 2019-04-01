import React, { Component } from 'react';
import {PageTemplate} from '../Templates/PageTemplate';
import Sidebar from '../Sidebar/Sidebar';
//import components dashboard, header, sidebar


class DashboardPage extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <PageTemplate sidebar={<Sidebar/>} content={React.createElement('div')} />
        )
    }
}

export default DashboardPage;