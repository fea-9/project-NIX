import React, { PureComponent } from 'react'

import { Scrollbars } from 'react-custom-scrollbars';

class SearchList extends PureComponent {
    render() {
        console.log("searchList", this.props.data)
        console.log(JSON.stringify(this.props.data.data.articlesList))
        return (
            <div className="search-list_wrapper">
                <div className="search-list_header">
                    <h3 className="search-list_header-name" >
                        Articles 
                        <span className="search-list_header-name-count" >
                            ({this.props.data.data.totalCount})
                        </span>
                    </h3>
                    <div className="search-list_header-sort-wrapper">
                        Sort by
                        <select className="search-list_header-sort">
                            <option className="search-list_header-sort-item">Max to min</option>
                            <option className="search-list_header-sort-item">Min to max</option>
                        </select>
                    </div>
                </div>
                <div className="search-list_content">
                    <Scrollbars>
                        {
                            this.props.data.data.articlesList.map((article, index) => {
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
export default SearchList