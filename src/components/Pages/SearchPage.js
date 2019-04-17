import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/search'
import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import { HeaderTemplate } from "../Header/Header";
import SearchList from '../Search/SearchList'
import Spinner from "../Spinner/Spinner";
import SearchInput from "../BaseComponents/Forms/SearchInput";
import {Copyright} from "../Copyright/Copyright";
import Error from "../Error/Error"


let mapStateToProps = state => ({
  search: state.search,
  token: state.auth.user.access_token
});

class SearchPage extends Component {

  componentDidMount() {
    let token = localStorage.getItem("access_token");
    const { location, searchRequest } = this.props
    location.search && searchRequest({ request: location.search.substr(1) }, token);
    
  }

  componentWillUnmount(){
    this.props.searchClear()
  }

  changeInput =()=> this.props.location.search ? this.props.location.search.substr(1): ''

  render() {
    let p = this.props;
    return (
      <PageTemplate
        title="Search"
        sidebar={<Sidebar />}
        header={
          p.search.data === null ? (
            <HeaderTemplate title="Search" />)
          :
          p.search.data.data.length === 0 ? 
            <HeaderTemplate title="Search"/>
          :
            <HeaderTemplate component={
              (<SearchInput inputValue={this.changeInput()}/>)}/>
          }
        content={
          p.location.search ?
            p.search.initial || p.search.isFetching ? 
            (
              <Spinner procent={true} />
            ) 
            : 
            p.search.error 
            ? 
            (
              <Error/>
            ) 
            : 
            p.search.data.data.length === 0 && this.props.location.search
            ?     
                  <div className="search-box" >
                      <SearchInput inputValue={this.changeInput()} /> 
                      <p className="search-box-input-fail">Nothing was found :(</p>
                        <div className="search-box_copyright-wrapper">
                          <Copyright searchClass={true}/>
                        </div>
                  </div>
                  :
                  ( 
                      <SearchList data={p.search.data} />
                  ) 
                  :
                  <div className = "search-box">
                    <SearchInput inputValue={this.changeInput()}/>
                    <div className="search-box_copyright-wrapper">
                    <Copyright searchClass={true}/>
                    </div>
                  </div>
        }
      />
    );
  }
}

SearchPage = connect(
  mapStateToProps,
  { ...actions }
)(SearchPage);

export default SearchPage;
