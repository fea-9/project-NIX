import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/publicProfile";
import Spinner from "../Spinner/Spinner";
import getFullMonthDate from "../../utils/getFullMonthDate";
import Error from "../Error/Error";
import Icon from "../BaseComponents/icon/index";
import { Scrollbars } from "react-custom-scrollbars";
import AvaMock from "../CommunityTable/AvaMock";
import SwitchImage from "../SwitchImage/SwitchImage";
import CustomScrollbars from "../CustomScrollbars/CustomScrollbars";

let mapStateToProps = state => ({
  publicProfile: state.publicProfile,
  mobile: state.resize.mobile
});
const SlideItem = ({title, dop}) => (
    <div className="slide-item">
        <Icon
                    type="projectsIcon"
                    className="list-icon"
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                  />
        <div className="slide-item__info">
            <div className="slide-item__title">{title}</div>
            <div className="slide-item__dop">{dop}</div>
        </div>
    </div>
)
class SlideCard extends Component {
  toLeft = e => {
      this.scrollbars.scrollToLeft()
  }
  toRight = e => {
      this.scrollbars.scrollToRight()
  }
  scrollbars = null
  render(){
      const { icon, title, arrows, data} = this.props
      return (
        <div className="slide-card">
        <div className="slide-head">
            <div className="slide-icon">{icon}</div>
            <div className="slide-title">{title}</div>
            <div className="slide-arrows">{arrows.map((el,ind)=>(
                <div key={ind} onClick={ind ? this.toRight : this.toLeft}>{el}</div>
            ))}</div>
        </div>
        <div className="slide-body">
            <Scrollbars ref={el => this.scrollbars = el}>
            <div className="slide-body__line">
                    {data.slice(0, Math.floor(data.length/2)).map((el,ind) => (
                        <SlideItem key={ind} title={el.title} dop={el.contributors}/>
                    ))}
            </div>
            <div className="slide-body__line">
                    {data.slice(Math.ceil(data.length/2)).map((el,ind) => (
                        <SlideItem key={ind} title={el.title} dop={el.contributors}/>
                    ))}
            </div>
            </Scrollbars>
        </div>
        </div>
    );
  }
}

class DescriptionCard extends Component {
    state = {
        ind: 0
    }
    clickHandler = ind => e => {
        this.setState({ind: ind})
    }
    render(){
        const{data, mobile} = this.props
        if(!data) return (
            <div className="des-card">
                <h2>No Description</h2>
            </div>
        )
        return(
            <div className={`des-card${mobile}`}>
                <div className={`des-card${mobile}__head`}>
                    {data.map((el,ind)=>(
                        <div key={ind} className={`des-card${mobile}__item`}
                        style={ind === this.state.ind ? {
                            background: "linear-gradient( #ffffff, #03EFFE90)",
                            borderBottom: "5px solid #37D3CA"
                        } : {}}
                        onClick={this.clickHandler(ind)}>
                            <span>{el.type}</span>
                        </div>
                    ))}
                </div>
                <div className="des-card__body">
                        {data[this.state.ind].content}
                </div>
            </div>
        )
    }
}

const CitiedCard = ({data}) => {
    if(!data) return (
        <div className="cit-card">
            <h2>No Citations</h2>
        </div>
    )
    return (
        <div className="cit-card">
            <div className="cit-head">
                <Icon className = "dashboard-menu-poa" type = "mostCitedIcon" width = {20} height = {20} viewBox="0 0 20 20"/>
                <p>MOST CITIED</p>
            </div>
            <div className="cit-body">
                <div className="cit-body__title">
                    {data.articleTitle}
                </div>
                <div className="cit-body__info">
                    {data.articleContributors}
                </div>
                <div className="cit-body__theme">
                    {data.articleSource}
                </div>
                <div className="cit-body__words">
                    {data.articleKeywords.map((el,ind) => (
                        <span key={ind}>{el}</span>
                    ))}
                </div>
            </div>
            <div className="cit-bottom">
                <div className="cit-bottom__total">
                    <span>{data.articleCitations}</span> Citations
                </div>
                <div className="cit-dot"></div>
                <div className="cit-bottom__text">
                    {data.articleType.displayName}
                </div>
            </div>
        </div>
    )
}

class PublicProfile extends Component {
  componentDidMount() {
    const { userId, getPublicProfile } = this.props
    getPublicProfile(userId);
  }
  render() {
    let p = this.props;
    if (p.publicProfile.initial || p.publicProfile.isFetching)
      return <Spinner procent={true} />;
    if (p.publicProfile.error) return <Error title="ERROR 404" description="User not found"/>;
    const textView = str =>
      str
        .split("")
        .reduce(
          (prev, symb) =>
            symb === symb.toUpperCase() ? (prev += " " + symb) : (prev += symb),
          ""
        );
    const data = p.publicProfile.data;
    const mobile = p.mobile ? "-mobile" : ""
    return (
      <div className="pub-us-main">
        <CustomScrollbars >
          <div className="pub-us-head">
            <div className={`pub-us-layout${mobile}`}>
              <SwitchImage src={data.logoUrl} 
                          className={`pub-ava${mobile}`} 
                          alt={<AvaMock text={data.name} className={`pub-ava${mobile}`} width="12rem" height="12rem"/>}/>
              {/* <img src={data.logoUrl} alt="*" /> */}
              <div className={`pub-us-title${mobile}`}>
                <h3>{data.name}</h3>
                <p>Member since {getFullMonthDate(data.createdDate)}</p>
              </div>
            </div>
            <div className={`pub-us-total${mobile}`}>
              {Object.entries(data.totalStats).map((el, ind) => {
                const colors = ["#34FFF3", "#5CE5DD", "#37D3CA"];
                return (
                  <div className={`pub-us-inf${mobile}`} key={ind}>
                    <div
                      className={`pub-us-inf${mobile}__num`}
                      style={{ color: colors[ind] }}
                    >
                      {el[1]}
                    </div>
                    <div className={`pub-us-inf${mobile}__text`}>{textView(el[0])}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`pub-us-body${mobile}`}>
            <div className={`pub-us-left${mobile}`}>
              <div className="pub-us-panel">
                {Object.entries(data.platformStats).map((el, ind) => (
                  <div className="pub-us-item" key={ind}>
                    <div className="pub-us-item__num">{el[1]}</div>
                    <div className="pub-us-item__text">{textView(el[0])}</div>
                  </div>
                ))}
              </div>
              <div className="pub-us-center">
                <SlideCard
                  icon={
                    <Icon
                      type="projectsIcon"
                      className="list-icon"
                      width={20}
                      height={20}
                    />
                  }
                  title="Public Projects"
                  arrows={[
                    <Icon
                      type="tabPrewIcon"
                      className="arrow-icon"
                      width={10}
                      height={18}
                      viewBox="0 0 10 18"
                    />,
                    <Icon
                      type="tabNextIcon"
                      className="arrow-icon"
                      width={10}
                      height={18}
                      viewBox="0 0 10 18"
                    />
                    
                  ]}
                  data={data.publicProjects}
                />
              </div>
              <div className={`pub-us-bottom${mobile}`}> 
                  <DescriptionCard mobile={mobile} data={data.description}/>
              </div>
            </div>
            <div className={`pub-us-right${mobile}`}> 
                  <CitiedCard data={data.mostCitationsArticle}/>
            </div>
          </div>
        </CustomScrollbars>
      </div>
    );
  }
}

PublicProfile = connect(
  mapStateToProps,
  { ...actions }
)(PublicProfile);

export default PublicProfile;
