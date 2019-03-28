import React, {Component} from "react";

import * as actions from "../actions/auth"

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {authValidation} from "../Auth/authValidate"
import {InputField, CheckboxField, TextareaField} from "../Auth/input"


class ProlileForm extends Component{
    
    defaultState = {
        withValidation: {
            firstName: {
                value: this.props.user.fullName.split(" ")[0],                           
                type: "text",
                placeholder: "First name...",
                name: "firstName",
                label: "first name",
                touch: false,
                valid: false,
                errorMsg: "",
                required: true 
            },
            lastName: {
                value: this.props.user.fullName.split(" ")[1],                           
                type: "text",
                placeholder: "Last name...",
                name: "lastName",
                label: "last name",
                touch: false,
                valid: false,
                errorMsg: "",                
                required: true 
            },
            email: {
                value: this.props.user.email,                          
                type: "email",
                placeholder: "Email...",
                name: "email",
                label: "email",
                touch: false,
                valid: false,
                errorMsg: "",                
                required: true 
            }           
        },        
        checkbox: {
            type: "checkbox",
            label: "Public Profile",
            message: "Let other users know you are open to connecting. You can customize a note about this just above",
            value: "public",
            name: "publicity",
            checked: false // from props            
        },        
        textarea: {
            label: "description",
            labelSpan: "(optional)",
            value: "I am open to connecting and meeting new potential collaborators.", // from props
            name: "description",
            maxlength: 250,
            placeholder: "Add some information about yourself..."            
        },
        input: {
            value: "",               
            type: "text",
            placeholder: "Add your research areas to enhance discoverability...",
            name: "researchAreas",
            label: "research areas",
            labelSpan: "(optional)",                 
            required: false
        },
        researchAreaTags: {
            tags: ["biology", "chemistry", "biochemistry"]
        }        
    }

    state = {
        ...this.defaultState 
    }

    validateInput = e => {
        e.persist()
        const { name, value } = e.target;
        this.setState(prevState => {            
            let {status, message} = authValidation(name, value)
            let valid = prevState.withValidation[name].touch ? !status : prevState.withValidation[name].valid
            return {
                ...prevState,
                withValidation: {
                    ...prevState.withValidation,
                    [name]: {
                        ...prevState.withValidation[name],
                        value,
                        valid,
                        touch: e.type === "blur" ? true : prevState.withValidation[name].touch,
                        errorMsg: message
                    }
                }
            }             
        })
    }

    onChangeInput = (e) => {
        e.persist()
        const { name, value } = e.target;
        this.setState(prevState => {  
            return {
                ...prevState,                
                [name]: {
                    ...prevState[name],
                    value                        
                }
            }
        })   
    }
    
    onCheckbox = (e) => {
        e.persist()
        const { name } = e.target;
        this.setState(prevState => {  
            return {
                ...prevState,                
                [name]: {
                    ...prevState[name],
                    checked: !prevState[name].checked                        
                }
            }
        })   
    }   

    submit = e => {
        e.preventDefault();
        console.log("start submit")
        // let {auth, id} = this.props
        // const {email, firstName, lastName} = this.state.withValidation
        // const values = {
        //     email: email.value,             
        //     fullName: `${firstName.value.trim()} ${lastName.value.trim()}`
        // };
        // if (this.formIsValid()){
        //     console.log("submit", values)
        //     auth (values, `users/object/${id}/update`);
        // }        
    }

    formIsValid = () => {
        let validForm = true

        Object.keys(this.state.inputs).forEach(elem => {
            if (elem.required){
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
            }
        })
       
        return validForm

    }

    addEmailField = () => {
        let i = 2
        this.setState({
            ["email" + i++]: {
                value: "",                          
                type: "email",
                placeholder: "Email...",
                name: "email",
                touch: false,
                valid: false,
                errorMsg: "",                
                required: true 
            }  
        })
    }

    resetForm = () => {
        this.setState(this.defaultState)
    }

    render () {
        console.log(this.state)

        let {isFetching, authError, authErrorMessage } = this.props

        let {checkbox, textarea, input} = this.state
        let errorMessage = authErrorMessage === "User already exist" ? 
            "User already exist" : "Something went wrong. Try again, please"
        let list = Object.keys(this.state.withValidation).map (elem => {
            let stateItem = this.state.withValidation[elem]
            return <InputField 
                key={elem}
                name={stateItem.name} 
                type={stateItem.type} 
                label={stateItem.name}
                placeholder={stateItem.placeholder}
                value={stateItem.value}
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
                <CheckboxField 
                    label={checkbox.label} 
                    type={checkbox.type}
                    message={checkbox.message} 
                    value={checkbox.value} 
                    name={checkbox.name} 
                    checked={checkbox.checked}  
                />
                <TextareaField 
                    label={textarea.label} 
                    labelSpan={textarea.labelSpan} 
                    value={textarea.value} 
                    name={textarea.name} 
                    maxlength={textarea.maxlength}
                    placeholder={textarea.placeholder}
                    cols={50}
                    rows={7}
                />
                <InputField 
                    value={input.value}            
                    type={input.type} 
                    placeholder={input.placeholder} 
                    name={input.name} 
                    label={input.label} 
                    labelSpan={input.labelSpan}                  
                    
                />
                <button disabled={isFetching}> Save </button>
                <button disabled={isFetching} onClick={this.resetForm} > Discard </button>
            </form>           
        )
    }   
}

const mapStateToProps = state => {
	return {
        // user: state.auth.user,
        // id: state.auth.user.id,
        isFetching: state.auth.isFetching,
        authError: state.auth.error,
        authErrorMessage: state.auth.message
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProlileForm);