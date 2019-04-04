import React, { Component } from "react";
import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import DocumentsTable from "../DocumentsTable/DocumentsTable";
//import components documents, header, sidebar

class DocumentsPage extends Component {
  componentDidMount() {}

  render() {
    return <PageTemplate sidebar={<Sidebar />} content={<DocumentsTable />} />;
  }
}

export default DocumentsPage;
