import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
//test
import TestButton from "../DocumentsTable/TestButton"
import getFullMonthDate from "../../utils/getFullMonthDate"
import TestSpiner from "../DocumentsTable/TestSpiner"

let generateCommunityMock = async () => {
  let res = []
  console.log("start")
  let gitHubUsers = await fetch (
     `https://api.github.com/users?since=${Math.round(Math.random()*1000)}`
   )
  .then ( response => response.json())
  console.log("start for in")
  for(let prop in gitHubUsers){
	console.log(gitHubUsers[prop])
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


let InfoBlock = p => (
  <div className={p.className}>
    <div className={p.className + "__num"}>
      {p.num}
    </div>
    <div className={p.className + "__text"}>
      {p.text}
    </div>
  </div>
)


export default class CommunityTable extends Component {
  state = {
    data: []
  }
  componentDidMount(){
    generateCommunityMock().then(response=>{
      this.setState({data: response})
    })
  }
  render(){
    console.log("render")
    return(
      <div className="community-table">
        <div className="community-table__total-info">
          {this.state.data.length} People community
        </div>
          <div className="community-table__main">
            <Scrollbars>
                {!this.state.data.length ? <TestSpiner full={true}/> :
                  this.state.data.map ((user, index) => {
                    let avatarUrl = URL.createObjectURL(user.avatar)
                    return (
                      <div key={index} className="community-table__main__line">
                            <img
                              className="community-table__main__line__ava"
                              src={avatarUrl} />
                            <div className="community-table__main__line__info">
                              <div className="community-table__main__line__info__name">
                                {user.name}
                              </div>
                              <div className="community-table__main__line__info__since">
                                Member since {getFullMonthDate(user.since)}
                              </div>
                            </div>
                            <InfoBlock className="community-table__main__line__block"
                              num={user.proofsExistence}
                              text={"TOTAL PROOFS OF EXISTENCE"}
                            />
                          <InfoBlock className="community-table__main__line__middle-block"
                            num={user.proofsAttribution}
                            text={"TOTAL PROOFS OF ATTRIBUTION"}
                          />
                          <InfoBlock className="community-table__main__line__block"
                            num={user.totalCitation}
                            text={"TOTAL CITATIONS"}
                          />
                          <TestButton text="View"/>
                      </div>
                    )
                  })
              }
            </Scrollbars>
          </div>
      </div>
    )
  }
}
