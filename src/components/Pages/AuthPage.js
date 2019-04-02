import React, { Component } from 'react';
import {PageTemplate} from '../Templates/PageTemplate';
import Auth from '../Auth/Auth'
import Sidebar from '../Sidebar/Sidebar';


class AuthPage extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <PageTemplate  content={<Auth/>} />
        )
    }
}

export default AuthPage;
