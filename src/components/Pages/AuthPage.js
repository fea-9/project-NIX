import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";

import * as actions from "../actions/auth";

import { PageTemplate } from "../Templates/PageTemplate";
//import components content, header, sidebar

import Auth from "../Auth/Auth"
import AuthSignIn from "../Auth/AuthSignIn";
import AuthSignUp from "../Auth/AuthSignUp";


class AuthPage extends Component {
    state = { currentForm: "signin"};

    componentDidMount = () => {
        const { match } = this.props;
        if (match.params.id !== this.state.currentForm){
            this.setState({ currentForm: match.params.id })                           
        }             
    }  

    componentDidUpdate = (prevProps, prevState) => {
        const { match, history, resetAuth } = this.props; 
        
        if (match.params.id !== prevState.currentForm){
            this.setState({ currentForm: match.params.id })
            resetAuth()
            return history.push(`/auth/${match.params.id}`)                
        } 
    }

    render() {
        const authComponent = this.state.currentForm === "signin" ? <AuthSignIn /> :
        this.state.currentForm === "signup" ? <AuthSignUp /> : <AuthSignIn />;  
        return (
            <PageTemplate content = {<Auth authComponent = {authComponent} />} 
            
            />
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);


export default withRouter(connect(
    null,
    mapDispatchToProps
)(AuthPage));