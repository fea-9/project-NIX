import React, { Component } from "react";
import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import { HeaderTemplate } from "../Header/Header";
import CommunityTable from "../CommunityTable/CommunityTable";
import Spinner from "../Spinner/Spinner";
import * as actions from "../actions/community";
import { connect } from "react-redux";
import PublicProfile from "../PublicProfile/PublicProfile";
import Error from "../Error/Error";
import PropTypes from "prop-types";

let mapStateToProps = state => ({
  community: state.community,
  token: state.auth.user.access_token,
  mobile: state.resize.mobile

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
        title={"Community"}
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"Community"} />}
        content={
          p.location.search ? <PublicProfile userId={p.location.search.split("_")[1]}/> :
          p.community.initial || p.community.isFetching ? (
            <Spinner procent={true} />
          ) : p.community.error ? (
            <Error />
          ) : (
            <CommunityTable
              title={p.community.data.data.totalCount}
              data={p.community.data.data.memberslist}
              mobile={p.mobile}
            />
          )
        }
      />
    );
  }
}

CommunityPage.propTypes = {
  community: PropTypes.object,
  token: PropTypes.string,
  mobile: PropTypes.bool
}

CommunityPage = connect(
  mapStateToProps,
  { ...actions }
)(CommunityPage);

export default CommunityPage;
