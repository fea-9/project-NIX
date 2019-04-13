import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/search'
import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import { HeaderTemplate } from "../Header/Header";
import SearchList from '../Search/SearchList'
import Spinner from "../Spinner/Spinner";
import SearchInput from "../BaseComponents/Forms/SearchInput";


let mapStateToProps = state => ({
  search: state.search,
  token: state.auth.user.access_token
});

class SearchPage extends Component {

  componentDidMount() {
    let token = localStorage.getItem("access_token");
    const { location, searchRequest } = this.props
    //const search = queryString.parse(location.search)
    console.log('locsearch', location, location.search.substr(1))
    location.search && searchRequest({ request: location.search.substr(1) }, token);

  }

  render() {
    let p = this.props;
    console.log("searchprops", this.props)
    return (
      <PageTemplate
        sidebar={<Sidebar />}
        header={
          p.search.data === null ? (
            <HeaderTemplate title="Search" />)
          :
          p.search.data.data.length === 0 ? 
            <HeaderTemplate title="Search"/>
          :
            <HeaderTemplate component={(<SearchInput/>)}/>
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
              <h1>ERROR</h1>
            ) 
            : 
            p.search.data.data.length === 0 
            ?     
                  <div className="search-box" >
                      <SearchInput /> 
                      <p className="search-box-input-fail">Nothing was found :(</p>
                  </div>
                  :
                  ( 
                      <SearchList data={p.search.data} />
                  ) 
                  :
                  <div className = "search-box">
                    <SearchInput />
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
