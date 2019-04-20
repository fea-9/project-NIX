import React, {Component} from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import AuthSignIn from "./AuthSignIn";


class Auth extends Component {
    
	render() {	
        const { authComponent } = this.props
		
        return (
            <div className="auth-box">
                <div className="auth-box__aside">
                    <h1 className="auth-box__aside-logo">
                        LOGO
                    </h1>
                </div>
                <div className="auth-box__form">
                    <div className = "auth-box__form-wrapper">
                        <nav className="form-title">
                            <NavLink 
                                activeClassName="form-title__link--active"
                                className="form-title__link" to="/auth/signin" >
                                    Sign In
                            </NavLink>
                        
                            <NavLink 
                                activeClassName="form-title__link--active"
                                className="form-title__link" to="/auth/signup" >
                                    Sign Up
                            </NavLink>
                        </nav>
                        {authComponent}
                    </div>
                </div>
            </div>
        )
    }
}
Auth.propTypes = {
    authComponent: PropTypes.element,
    isFetching: PropTypes.bool,
    user: PropTypes.object
}
Auth.defaultProps = {
    authComponent: AuthSignIn,
    isFetching: false,
    user: {}
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isFetching: state.auth.isFetching_token
}); 

export default connect(mapStateToProps)(Auth);