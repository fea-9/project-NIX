import React, { Component } from "react";

import { connect } from "react-redux";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";

import { HeaderTemplate } from "../Header/Header";

import DashboardContent from "../DashboardContent/DashboardContent";

import * as actions from "../actions/dashboardRange";

import Spinner from "../Spinner/Spinner";

let mapStateToProps = state => ({
  dashRange: state.dashboardRange,
  token: state.auth.user.access_token
});

class DashboardPage extends Component {
  componentDidMount() {
    this.props.dashboardRequest({ period: "month" }, this.props.token); //this.props.match.params.range
  }

  render() {
    let p = this.props;
    console.log(p);
    console.log(p.dashRange.data);
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"Dashboard"} />}
        content={
          p.dashRange.initial || p.dashRange.isFetching ? (
            <Spinner procent={true} />
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
