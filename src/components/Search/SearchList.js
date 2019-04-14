import React, { PureComponent } from 'react'

import { Scrollbars } from 'react-custom-scrollbars';

class SearchList extends PureComponent {
    render() {
        console.log("searchList", this.props.data)
        console.log(JSON.stringify(this.props.data.data.articlesList))
        return (
            <div className="search-list_wrapper">
                <div className="search-list_header">
                    <h2>Articles{this.props.data.data.totalCount}</h2>
                    <div>сортировка</div>
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
                                        {
                                            article.articleKeywords.map((keyword, index)=>{
                                                return(
                                                    <div className ="keyword" key={index}>{keyword}</div>
                                                )
                                            })
                                        }
                                        <p>Artifacts {article.articleCitations}Citations</p>
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