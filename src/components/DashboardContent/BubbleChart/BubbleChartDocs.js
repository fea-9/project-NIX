import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CustomScrollbars from "../../CustomScrollbars/CustomScrollbars"

class DocumentsList extends Component {
    render () {
        const {key, documents} = this.props.data
        const {mobile} = this.props
        const documentsList =         
                <>
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
                    <Link className="keychart-list__link" to="/documents">
                        View more
                    </Link>
                </>
        return (
            <div className = "keychart-list__box" >
                {!mobile ? <CustomScrollbars>
                    {documentsList}
                </CustomScrollbars > : documentsList}
            </div>
        )
    }
}

DocumentsList.propTypes = {
    data: PropTypes.shape({
        key: PropTypes.string,
        documents: PropTypes.arrayOf(PropTypes.string)
    }),
    mobile: PropTypes.bool
}
DocumentsList.defaultProps = {
    data:{
        key: "",
        documents: []
    },
    mobile: false
}

const mapStateToProps = state => ({
    mobile: state.resize.mobile
});

export default connect(
    mapStateToProps,
    null
)(DocumentsList);