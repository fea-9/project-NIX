import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";

import { HeaderTemplate } from "../Header/Header";

import CommunityTable from "../CommunityTable/CommunityTable";

import Spinner from "../Spinner/Spinner";

import * as actions from "../actions/community";

import { connect } from "react-redux";

let mapStateToProps = state => ({
  community: state.community,
  token: state.auth.user.access_token
});
class CommunityPage extends Component {
  componentDidMount() {
    let token = localStorage.getItem("access_token");
    this.props.communityRequest(token);
  }

  render() {
    let p = this.props;
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"Community"} />}
        content={
          p.community.initial || p.community.isFetching ? (
            <Spinner procent={true} />
          ) : p.community.error ? (
            <h1>ERROR</h1>
          ) : (
            <CommunityTable
              title={p.community.data.data.totalCount}
              data={p.community.data.data.memberslist}
            />
          )
        }
      />
    );
  }
}

CommunityPage = connect(
  mapStateToProps,
  { ...actions }
)(CommunityPage);

export default CommunityPage;
