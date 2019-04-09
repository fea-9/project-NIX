import React, { Component } from "react";

import { PageTemplate } from "../Templates/PageTemplate";

import Sidebar from "../Sidebar/Sidebar";

import {HeaderTemplate} from "../Header/Header";

import CommunityTable from "../CommunityTable/CommunityTable";

import Spinner from "../Spinner/Spinner"
// {
//   totalCount: 345,
//   memberslist: [
//       {
//           memberId: "1",
//           memberName: "Jaiden Bahringer",
//           memberCreatedDate: 1522576800,
//           memberProofOfExistence: 15,
//           memberProofOfAttribution: 35,
//           memberCitations:  335
//       }
//   ]
// }

let generateCommunityMock = async () => {
  let res = []
  let gitHubUsers = await fetch (
     `https://api.github.com/users?since=${Math.round(Math.random()*1000)}`
   )
  .then ( response => response.json())
  let i = 1
  for(let prop in gitHubUsers){
	await fetch ( gitHubUsers[prop].avatar_url)
    .then ( response => {
      response.blob().then ( response => {
        res.push( {
          memberId: i++,
          memberName: gitHubUsers[prop].login,
          memberCreatedDate: new Date().getTime(),
          memberProofOfExistence: gitHubUsers[prop].login.length,
          memberProofOfAttribution: gitHubUsers[prop].starred_url.length,
          memberCitations: gitHubUsers[prop].events_url.length,
        })
      })
    })
  }
  return {totalCount: 345, memberslist: res}
}

class CommunityPage extends Component {
  state = {
    data: null
  }
  componentDidMount() {
    generateCommunityMock().then(res => {
      this.setState({data: res })
    })
  }

  render() {
    let s = this.state
    console.log(s.data)
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"Community"}/>}
        content={
          s.data ? <CommunityTable title={s.data.totalCount} 
                                   data={s.data.memberslist}/> :
            <Spinner procent={true} />
        }
      />
    );
  }
}

export default CommunityPage;
