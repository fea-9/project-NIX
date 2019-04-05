import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";
// import CommunityTable from "../CommunityTable/CommunityTable";

class CommunityPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        // content={<CommunityTable />}
        content={React.createElement("div")}
      />
    );
  }
}

export default CommunityPage;
