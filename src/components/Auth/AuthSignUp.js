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
                placeholder: "First name...",
                name: "firstName",
                label: "first name"                                     
            },
            touch: false,
            valid: false,
            errorMsg: "" 
        },
        lastName: {
            value: '',
            config: {           
                type: "text",
                placeholder: "Last name...",
                name: "lastName",
                label: "last name"                                    
            },
            touch: false,
            valid: false,
            errorMsg: "" 
        },
        email: {
            value: '',
            config: {           
                type: "email",
                placeholder: "Email...",
                name: "email",
                label: "email"                                    
            },
            touch: false,
            valid: false,
            errorMsg: "" 
        },
        password: {
            value: '',
            config: {            
                type: "password",
                placeholder: "Password...",
                name: "password",
                label: "password"                            
            },
            touch: false,
            valid: false,
            errorMsg: ""
        },
        confirmPassword: {
            value: '',
            config: {            
                type: "password",
                placeholder: "Confirm password...",
                name: "confirmPassword",
                label: ""                             
            },
            touch: false,
            valid: false,
            errorMsg: ""
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
                        errorMsg: message
                    },
                    confirmPassword: {
                        ...prevState.confirmPassword,
                        valid: !confirmValid.status,
                        errorMsg: confirmValid.message
                    }
                }
            } else return {
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value,
                    valid,
                    touch: e.type === "blur" ? true : prevState[name].touch,
                    errorMsg: message
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
                    errorMsg: message,
                    valid: !status,
                    touch: true
                }
            }))
            validForm = !status && validForm
        })
       
        return validForm

    }

    render () {
        let {isFetching, authErrorMessage } = this.props
        let errorMessage = authErrorMessage === "User already exist" ? 
            "User already exist" : "Something went wrong. Try again, please"
        let list = Object.keys(this.state).map (elem => {
            let stateItem = this.state[elem]
            return <InputField 
                key={elem}
                name={stateItem.config.name} 
                type={stateItem.config.type} 
                label={stateItem.config.label}
                placeholder={stateItem.config.placeholder}
                touch={stateItem.touch}
                errorMsg={stateItem.errorMsg}
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