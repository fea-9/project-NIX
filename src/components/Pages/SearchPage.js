import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";
import {HeaderTemplate} from "../Header/Header";

class SearchPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"SEARCH"}/>}
        content={React.createElement("div")}
      />
    );
  }
}

export default SearchPage;
