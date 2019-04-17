import React, { PureComponent } from 'react'
import sortFunc from "../../utils/sortFunc.js";
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from "react-redux";
import * as actions from "../actions/search";

let mapStateToProps = state => ({
    search: state.search,
    token: state.auth.user.access_token
  });

class SearchList extends PureComponent {

    sortSearch = e =>{
        let nData = this.props.data;
        if(e.target.value === "Max"){
            nData.articlesList = sortFunc(this.props.data.articlesList, "articleCitations")
            this.props.setSearchData(nData)
        }
        else if(e.target.value === "Min"){
            nData.articlesList = sortFunc(this.props.data.articlesList, "articleCitations", true)
            this.props.setSearchData(nData)
        }
    }

    render() {
        return (
            <div className="search-list_wrapper">
                <div className="search-list_header">
                    <h3 className="search-list_header-name" >
                        Articles 
                        <span className="search-list_header-name-count" >
                            ({this.props.data.totalCount})
                        </span>
                    </h3>
                    <div className="search-list_header-sort-wrapper">
                        Sort by
                        <select onChange={this.sortSearch} className="search-list_header-sort">
                            <option value="Max" className="search-list_header-sort-item">Max to min</option>
                            <option value="Min" className="search-list_header-sort-item">Min to max</option>
                        </select>
                    </div>
                </div>
                <div className="search-list_content">
                    <Scrollbars>
                        {
                            this.props.data.articlesList.map((article, index) => {
                                return (
                                    <div key={index} className="article_item">
                                        <h3 className="article_title">
                                            {article.articleTitle}
                                        </h3>
                                        <p className="article_contributors">
                                            {article.articleContributors}
                                        </p>
                                        <p className="article_source">{article.articleSource}</p>
                                        <div className="article_keyword-container">
                                        {
                                            article.articleKeywords.map((keyword, index) => {
                                                return (
                                                    <p className="article_keyword-item" key={index}>{keyword}</p>
                                                )
                                            })
                                        }
                                        </div>
                                        <div className="article_count-container">
                                            <p className="article_count-artifacts">
                                                Artifacts 
                                            </p>
                                            <p className="article_count-count">{article.articleCitations}</p>
                                            <p className="article_count-citations">Citations</p>
                                        </div>
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

SearchList = connect(
    mapStateToProps,
    { ...actions }
  )(SearchList);
  
export default SearchList;
