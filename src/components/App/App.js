import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage';
//testing
import {PageTemplate} from "../Templates/PageTemplate"
import CommunityTable from "../CommunityTable/CommunityTable"
import DocumentsTable from "../DocumentsTable/DocumentsTable"
import TransDocGraph from "../DashboardContent/TransDocGraph/TransDocGraph"

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem("token");

		if (token) {
			const { setToken } = this.props;
			return setToken(token);
		}
  }

  render() {
    return (

      <TransDocGraph />
    );
  }
}

export default App;
