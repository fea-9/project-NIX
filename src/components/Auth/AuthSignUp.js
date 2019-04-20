import React, {Component} from "react";
import PropTypes from 'prop-types';

import * as actions from "../actions/auth";
import { connect } from 'react-redux';

import {authValidation} from "../../utils/authValidate";
import InputField from "../BaseComponents/Forms/Input";

class SignUp extends Component{
    state = {
        firstName: {
            value: '',
            config: {           
                type: "text",
                placeholder: "First name...",
                name: "firstName",
                label: "first name",
                required: true                                     
            },
            validationRequired: {
                touch: false,
                valid: false,
                errorMsg: "" 
            } 
        },
        lastName: {
            value: '',
            config: {           
                type: "text",
                placeholder: "Last name...",
                name: "lastName",
                label: "last name",
                required: true                                    
            },
            validationRequired: {
                touch: false,
                valid: false,
                errorMsg: "" 
            }  
        },
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
        },
        confirmPassword: {
            value: '',
            config: {            
                type: "password",
                placeholder: "Confirm password...",
                name: "confirmPassword",
                label: "",
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

        this.setState(prevState => {
            const {status, message} = authValidation(name, value, this.state.password.value, "signUp")
            const valid = prevState[name].validationRequired.touch ? !status : prevState[name].validationRequired.valid
            const currentInputChanged = {
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
            if (name === "password"){
                const {confirmPassword} = this.state
                const confirmValid = authValidation(confirmPassword.config.name, confirmPassword.value, value, "signUp")
                return {
                    ...currentInputChanged,
                    confirmPassword: {
                        ...prevState.confirmPassword,
                        validationRequired: {
                            touch: prevState.confirmPassword.validationRequired.touch,
                            valid: !confirmValid.status,
                            errorMsg: confirmValid.message
                        }                        
                    }
                }
            } else return {
                ...currentInputChanged
            }
        })
    }
   

    submit = e => {
        e.preventDefault();
        const {auth} = this.props
        const {email, password, firstName, lastName} = this.state
        const values = {
            email: email.value,
            password: password.value,
            fullName: `${firstName.value.trim()} ${lastName.value.trim()}`
        };
        if (this.formIsValid()){
            auth (values, "signup")
        }        
    }

    formIsValid = () => {
        let validForm = true

        Object.keys(this.state).forEach(elem => {
            let stateItem = this.state[elem]
            let {status, message} = authValidation(stateItem.config.name, stateItem.value, this.state.password.value, "signUp")            

            this.setState(prevState => ({
                ...prevState,
                [elem]: {
                    ...prevState[elem],
                    validationRequired: {
                        errorMsg: message,
                        valid: !status,
                        touch: true
                    }                    
                }
            }))
            validForm = !status && validForm
        })
       
        return validForm
    }

    render () {
        const {isFetching, authErrorMessage } = this.props
        const errorMessage = authErrorMessage === "User already exist" ? 
            "User already exists" : "Something went wrong. Try again, please"

        const list = Object.keys(this.state).map (elem => {
            let stateItem = this.state[elem]
            return <InputField 
                        key = {elem}
                        config = {stateItem.config}
                        validationRequired = {stateItem.validationRequired}
                        onBlur = {this.validateInput}
                        onChange = {this.validateInput}                
                    />
        })
        return (            
            <form className="auth__form" onSubmit={this.submit} noValidate={true} >
                {authErrorMessage && 
                    <span className = "form__error-message"> 
                        {errorMessage} 
                    </span>}
                {list}
                <button disabled={isFetching} className = "form-button auth-submit-button" > 
                    Sign Up 
                </button>
            </form>           
        )
    }   
}
SignUp.propTypes = {
    isFetching: PropTypes.bool,
    authErrorMessage: PropTypes.string,
    auth: PropTypes.func 
};
SignUp.defaultProps = {
    isFetching: false,
    authErrorMessage: "",
    auth: () => {console.log(`Auth submit isn't set`)} 
};

const mapStateToProps = state => ({
    isFetching: state.auth.isFetching,
    authErrorMessage: state.auth.message    
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);