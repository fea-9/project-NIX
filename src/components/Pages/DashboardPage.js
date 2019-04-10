import React, { Component } from "react";

import { connect } from "react-redux";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";

import { HeaderTemplate } from "../Header/Header";

import DashboardContent from "../DashboardContent/DashboardContent";

import * as actions from "../actions/dashboardRange";

import RangePanel from "../RangePanel/RangePanel";

import queryString from "query-string";

import Spinner from "../Spinner/Spinner";

let mapStateToProps = state => ({
  dashRange: state.dashboardRange,
  token: state.auth.user.access_token
});

class DashboardPage extends Component {
  componentDidMount() {
    const {location, token, dashboardRequest} = this.props
    const search = queryString.parse(location.search)
    dashboardRequest( search, token);
  }

  render() {
    let p = this.props;
  
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"Dashboard"} component={<RangePanel/>}/>}
        content={
          p.dashRange.initial || p.dashRange.isFetching ? (
            <DashboardContent spinner={true} />
          ) : p.dashRange.error ? (
            <h1>ERROR</h1>
          ) : (
            <DashboardContent data={p.dashRange.data.data} />
          )
        }
      />
    );
  }
}
DashboardPage = connect(
  mapStateToProps,
  { ...actions }
)(DashboardPage);
export default DashboardPage;
