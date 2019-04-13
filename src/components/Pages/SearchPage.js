import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";

import {HeaderTemplate} from "../Header/Header";

import Search from "../Search/Search"

class SearchPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageTemplate
        title="Search"
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"SEARCH"}/>}
        content={<Search/>}
      />
    );
  }
}

export default SearchPage;
