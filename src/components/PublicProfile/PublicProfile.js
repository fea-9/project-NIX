import React, {Component} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/publicProfile";
import Spinner from "../Spinner/Spinner";
import pup from "../../assets/images/pup.png";
import getFullMonthDate from "../../utils/getFullMonthDate";
import AvaMock from "../CommunityTable/AvaMock";
import svgList from "../../assets/icons/test.svg";
import test from "../../assets/icons/test2.svg";

let mapStateToProps = state => ({publicProfile: state.publicProfile})
// let mapStateToProps = state => ({
//     community: state.community,
//     token: state.auth.user.access_token
//   });

class PublicProfile extends Component {
    componentDidMount(){
        console.log(this.props,"DID")
        let token = localStorage.getItem("access_token");
        this.props.Request(token);//test mock
        // this.props.publicProfileRequest({id: this.props.userId}, token)
    }
    render(){
        let p = this.props
        console.log(user)
        if(p.community.initial || p.community.isFetching) 
            return (<Spinner procent={true} />)
        if(p.community.error) 
            return (<h1>ERROR</h1>)
            let user = p.community.data.data.memberslist.filter(el => el.memberId === p.userId )[0]
        return(
            <div className="publicUs">
                <div className="publicUs-title">
                    <div className="publicUs-layout" style={{backgroundImage: ` url(${pup}`}}>
                        <div className="publicUs-user-title">
                            <h1>{user.memberName}</h1>
                            <p>Member since {getFullMonthDate(user.memberCreatedDate)}</p>
                            <div className="publicUs-ava">
                                <AvaMock text={user.memberName} width={100} height={100}/>
                            </div>
                        </div>
                    </div>
                    <div className="publicUs-panel">
                        <div className="PUP-item">
                            <div className="PUP-item__num" style={{color: "#34FFF3"}}>
                                {user.memberProofOfExistence}
                            </div>
                            <div className="PUP-item__text" >
                                TOTAL PROOFS OF EXISTENCE
                            </div>
                        </div>
                        <div className="PUP-item">
                            <div className="PUP-item__num" style={{color: "#5CE5DD"}}>
                                {user.memberProofOfAttribution}
                            </div>
                            <div className="PUP-item__text">
                                TOTAL PROOFS OF ATTRIBUTION
                            </div>
                        </div>
                        <div className="PUP-item">
                            <div className="PUP-item__num" style={{color: "#37D3CA"}}>
                                {user.memberCitations}
                            </div>
                            <div className="PUP-item__text">
                                TOTAL CITATIONS
                            </div>
                        </div>
                    </div>
                </div>
                <div className="publicUs-body">
                    <div className="PUP-left">
                        <div className="PUP-left__panel" >
                            <div className="PUP-left__panel-item">
                                <p>136</p>
                                <p>Platform Activities</p>
                            </div>
                            <div className="PUP-left__panel-item">
                                <p>16</p>
                                <p>Projects</p>
                            </div>
                            <div className="PUP-left__panel-item">
                                <p>5</p>
                                <p>Public</p>
                            </div>
                        </div>
                        <div className="PUP-body">
                            
                        </div>
                        <div className="PUP-sidebar">
                            <div className="PUP-sidebar__head">
                                <img src={svgList} alt="hren" />
                                <h2>PUBLIC PROJECTS</h2>
                            </div >
                            <div className="PUP-sidebar__body">

                            </div>
                        </div>
                    </div>
                    <div className="PUP-right">
                        <div className="PUP-card">
                            <div className="PUP-card__head">
                                <img src={test} alt="hren" />
                                <h2>MOST CITED</h2>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="PUP-b-card">
                    <div className="PUP-b-card__head">
                        <div className="PUP-b-card__head__item">Summary</div>
                        <div className="PUP-b-card__head__item">Social</div>
                        <div className="PUP-b-card__head__item">Education</div>
                        <div className="PUP-b-card__head__item">Employment</div>
                    </div>

                </div>
            </div>
        )
    }
} 

PublicProfile = connect(mapStateToProps, {...actions})(PublicProfile)

export default PublicProfile