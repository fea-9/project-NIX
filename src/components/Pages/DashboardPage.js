import React, { Component } from "react";
import { connect } from "react-redux";

import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import { HeaderTemplate } from "../Header/Header";
import DashboardContent from "../DashboardContent/DashboardContent";
import * as actions from "../actions/dashboardRange";
import RangePanel from "../RangePanel/RangePanel"; 
import queryString from "query-string";
import Error from "../Error/Error";

let mapStateToProps = state => ({
  dashRange: state.dashboardRange,
  token: state.auth.user.access_token
});

class DashboardPage extends Component {
  componentDidMount() {
    const { location, getStats } = this.props;
    const search = queryString.parse(location.search);
    getStats(search);
  }

  render() {
    let p = this.props;
    return (
      <PageTemplate
        title={"Dashboard"}
        sidebar={<Sidebar />}
        header={
          <HeaderTemplate title={"Dashboard"} component={<RangePanel />} />
        }
        content={
          p.dashRange.initial || p.dashRange.isFetching ? (
            <DashboardContent spinner={true} />
          ) : p.dashRange.error ? (
            <Error />
          ) : (
            <DashboardContent data={p.dashRange.data} />
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
