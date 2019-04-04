import React, { Component } from "react";
import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import ProfileForm from "../Profile/ProlileForm";
//import components profile, header, sidebar

class ProfilePage extends Component {
  componentDidMount() {}

  render() {
    return <PageTemplate sidebar={<Sidebar />} content={<ProfileForm />} />;
  }
}

export default ProfilePage;
