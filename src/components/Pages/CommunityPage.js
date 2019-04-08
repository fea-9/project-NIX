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
  for(let prop in gitHubUsers){
	await fetch ( gitHubUsers[prop].avatar_url)
    .then ( response => {
        response.blob().then ( response => {
            res.push( {
				avatar: response ,
				name: gitHubUsers[prop].login,
				proofsExistence: gitHubUsers[prop].login.length,
				proofsAttribution: gitHubUsers[prop].starred_url.length,
				totalCitation: gitHubUsers[prop].events_url.length,
        since: `${Math.round(Math.random() * 30) + 1}.01.${Math.round(Math.random() * 1000) + 1000}`
			})
        })
    })
  }
  return res
}

class CommunityPage extends Component {
  state = {
    data: null
  }
  componentDidMount() {
    generateCommunityMock().then(res => this.setState({data: res }))
  }

  render() {
    let s = this.state
    console.log(s.data)
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={<HeaderTemplate title={"Community"}/>}
        content={
          s.data ? <CommunityTable data={s.data}/> :
            <Spinner procent={true} />
        }
      />
    );
  }
}

export default CommunityPage;
