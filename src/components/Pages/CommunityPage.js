import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";

import {HeaderTemplate} from "../Header/Header";

import CommunityTable from "../CommunityTable/CommunityTable";

class CommunityPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"Community"}/>}
        content={<CommunityTable />}
      />
    );
  }
}

export default CommunityPage;
