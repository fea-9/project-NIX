import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from "react-custom-scrollbars";

class DocumentsList extends Component {
    render () {
        const {key, documents} = this.props.data
        return (
            <div className = "keychart-list__box" >
            <Scrollbars>
                <h4 className = "keychart-list__name">
                    {key}
                </h4>               
                <ul className = "keychart-list__list">                    
                    {documents.map(doc => {
                        return <li 
                            className = "keychart-list__item" 
                            key = {key + Math.random() * 100} >
                                {doc}
                            </li>                            
                    })}                    
                </ul>
                </Scrollbars >
            </div>
        )
    }
}

DocumentsList.propTypes = {
    data: PropTypes.shape({
        key: PropTypes.string,
        documents: PropTypes.arrayOf(PropTypes.string)
      })
}
DocumentsList.defaultProps = {
    data:{
        key: "",
        documents: []
    }
}
export default DocumentsList