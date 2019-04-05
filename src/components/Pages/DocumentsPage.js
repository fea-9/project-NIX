import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";
// import DocumentsTable from "../DocumentsTable/DocumentsTable";

class DocumentsPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        // content={<DocumentsTable />}
        content={React.createElement("div")}
      />
    );
  }
}

export default DocumentsPage;
