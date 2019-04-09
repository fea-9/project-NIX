import React, {Component} from "react";
import PropTypes from 'prop-types';

import * as actions from "../actions/auth";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {authValidation} from "./authValidate";
import InputField from "../BaseComponents/Forms/Input";

class SignIn extends Component{
    state = {
        email: {
            value: '',
            config: {           
                type: "email",
                placeholder: "Email...",
                name: "email",
                label: "email",
                required: true                                     
            },
            validationRequired: {
                touch: false,
                valid: false,
                errorMsg: "" 
            }           
        },
        password: {
            value: '',
            config: {            
                type: "password",
                placeholder: "Password...",
                name: "password",
                label: "password",
                required: true                             
            },
            validationRequired: {
                touch: false,
                valid: false,
                errorMsg: "" 
            } 
        }
    }

    validateInput = e => {
        e.persist()
        const { name, value } = e.target;
        const {status, message} = authValidation(name, value)
        this.setState(prevState => {
            const valid = prevState[name].validationRequired.touch ? !status : prevState[name].validationRequired.valid
            return {
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value,
                    validationRequired: {                            
                        valid,
                        touch: e.type === "blur" ? true : prevState[name].validationRequired.touch,
                        errorMsg: message
                    }                    
                }
            }
        })
    }
   
    submit = e => {
        e.preventDefault();
        let {auth} = this.props
        const values = Object.keys(this.state).reduce((prev, elem) => ({ ...prev, [elem]: this.state[elem].value }), {});
        if (this.formIsValid()){
            auth (values, "signin");
        }        
    }

    formIsValid = () => {
        let validForm = true
      
        Object.keys(this.state).forEach(elem => {
            let stateItem = this.state[elem]
            let inputValid = authValidation(stateItem.config.name, stateItem.value)
            this.setState(prevState => ({
                ...prevState,
                [elem]: {
                    ...prevState[elem],
                    validationRequired: {
                        errorMsg: inputValid.message,
                        valid: !inputValid.status,
                        touch: true
                    }                    
                }
            }))
            validForm = !inputValid.status && validForm
        })       

        return validForm

    }

    render () {
        let {isFetching, authErrorMessage} = this.props
        let errorMessage = authErrorMessage === "Password incorrect" || 
            authErrorMessage === "No such user" ? "Incorrect email or password" : "Something went wrong. Try again, please"
        let list = Object.keys(this.state).map (elem => {
            let stateItem = this.state[elem]
            return <InputField 
                key={elem}
                config = {stateItem.config}
                validationRequired = {stateItem.validationRequired}                
                onBlur={this.validateInput}
                onChange={this.validateInput}                
                />
        })
        return (                        
            <form className="auth__form" onSubmit={this.submit} noValidate={true} >
                { authErrorMessage && 
                    <span className = "form__error-message"> 
                        {errorMessage} 
                    </span>}
                {list}
                <button disabled={isFetching} className = "form-button auth-submit-button" > 
                    Sign In 
                </button>
            </form>           
        )
    }   
}
SignIn.propTypes = {
    isFetching: PropTypes.bool,
    authErrorMessage: PropTypes.string,
    auth: PropTypes.func 
};
SignIn.defaultProps = {
    isFetching: false,
    authErrorMessage: "",
    auth: () => {console.log(`Auth submit ...`)} 
};

const mapStateToProps = state => {
	return {
        isFetching: state.auth.isFetching,
        authErrorMessage: state.auth.message	
	};
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);