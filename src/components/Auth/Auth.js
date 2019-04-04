import React, {Component} from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";

import * as actions from "../actions/auth";

import AuthSignIn from "./AuthSignIn";
import AuthSignUp from "./AuthSignUp"

class Auth extends Component {
    // state = { currentForm: "signin"};

    // componentDidMount = () => {
    //     const { match } = this.props;
    //     if (match.params.id !== this.state.currentForm){
    //         this.setState({ currentForm: match.params.id })                           
    //     }             
    // }  

    // componentDidUpdate = (prevProps, prevState) => {
    //     const { match, history, resetAuth } = this.props; 
        
    //     if (match.params.id !== prevState.currentForm){
    //         this.setState({ currentForm: match.params.id })
    //         resetAuth()
    //         return history.push(`/auth/${match.params.id}`)                
    //     } 
    // }

	render() {	
        const {authComponent} = this.props
        // const authComponent = this.state.currentForm === "signin" ? <AuthSignIn /> :
        //     this.state.currentForm === "signup" ? <AuthSignUp /> : <AuthSignIn />;         
		
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
                                className="form-title__link" to="/auth/signin" onClick = {this.switchForm} >
                                    Sign In
                            </NavLink>
                        
                            <NavLink 
                                activeClassName="form-title__link--active"
                                className="form-title__link" to="/auth/signup" onClick = {this.switchForm} >
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

export default Auth;
// const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);


// export default withRouter(connect(
//     null,
//     mapDispatchToProps
// )(Auth));