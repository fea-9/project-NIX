import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";

class SearchPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        content={React.createElement("div")}
      />
    );
  }
}

export default SearchPage;
