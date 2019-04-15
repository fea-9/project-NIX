import React, { Component } from "react";
import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import {HeaderTemplate} from "../Header/Header";
import DocumentsTable from "../DocumentsTable/DocumentsTable";


class DocumentsPage extends Component {

  render() {

    return (
      <PageTemplate
        title={"Documents"}
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"DOCUMENTS"}/>}
        content={
            <DocumentsTable />
        }
      />
    );
  }
}


export default DocumentsPage;
