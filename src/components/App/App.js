import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage';
import DocumentsTable from "../DocumentsTable/DocumentsTable";
import CommunityTable from "../CommunityTable/CommunityTable"

class App extends Component {
  render() {
    return (
      <CommunityTable/>
    );
  }
}

export default App;
// <DocumentsTable />
//
// <Switch>
//   <Route path='/auth' component={AuthPage}/>
// </Switch>
