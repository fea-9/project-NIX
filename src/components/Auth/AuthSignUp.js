import React, {Component} from "react";

import * as actions from "../actions/auth"

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {authValidation} from "./authValidate"
import {InputField} from "./input"

class SignUp extends Component{
    state = {
        firstName: {
            value: '',
            config: {           
                type: "text",
                placeholder: "Enter your first name",
                name: "firstName"                                     
            },
            touch: false,
            valid: false,
            error: "" 
        },
        lastName: {
            value: '',
            config: {           
                type: "text",
                placeholder: "Enter your last name",
                name: "lastName"                                     
            },
            touch: false,
            valid: false,
            error: "" 
        },
        email: {
            value: '',
            config: {           
                type: "email",
                placeholder: "Enter your email",
                name: "email"                                     
            },
            touch: false,
            valid: false,
            error: "" 
        },
        password: {
            value: '',
            config: {            
                type: "password",
                placeholder: "Enter your password",
                name: "password"                             
            },
            touch: false,
            valid: false,
            error: ""
        },
        confirmPassword: {
            value: '',
            config: {            
                type: "password",
                placeholder: "Confirm your password",
                name: "confirmPassword"                             
            },
            touch: false,
            valid: false,
            error: ""
        }
    }

    validateInput = e => {
        e.persist()
        const { name, value } = e.target;
        this.setState(prevState => {
            let {status, message} = authValidation(name, value, this.state.password.value)
            let valid = prevState[name].touch ? !status : prevState[name].valid
            if (name === "password"){
                const {confirmPassword} = this.state
                let confirmValid = authValidation(confirmPassword.config.name, confirmPassword.value, value)
                return {
                    ...prevState,
                    [name]: {
                        ...prevState[name],
                        value,
                        valid,
                        touch: e.type === "blur" ? true : prevState[name].touch,
                        error: message
                    },
                    confirmPassword: {
                        ...prevState.confirmPassword,
                        valid: !confirmValid.status,
                        error: confirmValid.message
                    }
                }
            } else return {
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value,
                    valid,
                    touch: e.type === "blur" ? true : prevState[name].touch,
                    error: message
                }
            }
        })
    }
   

    submit = e => {
        e.preventDefault();
        console.log("start submit")
        let {auth} = this.props
        const {email, password, firstName, lastName} = this.state
        const values = {
            email: email.value,
            password: password.value,
            fullName: `${firstName.value.trim()} ${lastName.value.trim()}`
        };
        if (this.formIsValid()){
            console.log("submit", values)
            auth (values, "signup");
        }        
    }

    formIsValid = () => {
        let validForm = true

        Object.keys(this.state).forEach(elem => {
            let stateItem = this.state[elem]
            let {status, message} = authValidation(stateItem.config.name, stateItem.value, this.state.password.value)            

            this.setState(prevState => ({
                ...prevState,
                [elem]: {
                    ...prevState[elem],
                    error: message,
                    valid: !status,
                    touch: true
                }
            }))
            validForm = !status && validForm
        })
       
        return validForm

    }

    render () {
        let {isFetching, authError, authErrorMessage } = this.props
        let errorMessage = authErrorMessage === "User already exist" ? 
            "User already exist" : "Something went wrong. Try again, please"
        let list = Object.keys(this.state).map (elem => {
            let stateItem = this.state[elem]
            return <InputField 
                key={elem}
                name={stateItem.config.name} 
                type={stateItem.config.type} 
                label={stateItem.config.name}
                placeholder={stateItem.config.placeholder}
                touch={stateItem.touch}
                error={stateItem.error}
                valid={stateItem.valid}
                onBlur={this.validateInput}
                onChange={this.validateInput}                
                />
        })
        return (            
            <form onSubmit={this.submit} noValidate={true} >
                {authErrorMessage && <span> {errorMessage} </span>}
                {list}
                <button disabled={isFetching}> Sign Up </button>
            </form>           
        )
    }   
}

const mapStateToProps = state => {
	return {
        isFetching: state.auth.isFetching,
        authError: state.auth.error,
        authErrorMessage: state.auth.message
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);