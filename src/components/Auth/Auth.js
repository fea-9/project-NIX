import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as actions from "../actions/auth";

import AuthSignIn from "./AuthSignIn";
import AuthSignUp from "./AuthSignUp"

class Auth extends Component {
    state = { switchForm: false };

	switchForm = () => {
        const { resetAuth } = this.props;       
        this.setState(prevState => ({ switchForm: !prevState.switchForm }))
        resetAuth()
    };

	render() {
		const { switchForm } = this.state;
		const { accessToken } = this.props;
		
		// if (accessToken) {
		// 	return <Redirect to="/" />;
        // }       
   
        return (
            <div className="auth_wrapper" >
                {switchForm ? 
                <AuthSignUp /> : 
                <AuthSignIn /> }
                <button onClick={this.switchForm}>{switchForm ? "Have an account?" : "Don't have account?"}</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

const mapStateToProps = state => ({
	accessToken: state.auth.access_token
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);