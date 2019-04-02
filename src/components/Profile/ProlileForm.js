import React, {Component} from "react";

import * as actions from "../actions/auth"

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {authValidation} from "../Auth/authValidate"
import {InputField, CheckboxField, TextareaField} from "../Auth/input"
import ProfileAvatar from "./ProfileAvatar"


class ProlileForm extends Component{
    
    defaultState = {
        withValidation: {
            firstName: {
                value: this.props.user.fullName.split(" ")[0],
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
                value: this.props.user.fullName.split(" ")[1], 
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
                value: this.props.user.email,                          
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
            }           
        },        
        publicity: {
            checked: false, // from props
            config: {
                type: "checkbox",
                label: "Public Profile",
                message: "Let other users know you are open to connecting. You can customize a note about this just above",
                value: "public",
                name: "publicity",
            }          
        },        
        description: {            
            value: "I am open to connecting and meeting new potential collaborators.", // from props
            config: {
                type: "textarea",
                label: "description",
                required: false,
                name: "description",
                placeholder: "Add some information about yourself...",
                maxlength: 250,
                cols: 50,
                rows: 7
            },            
            maxlength: 250,                        
        },
        researchAreas: {
            value: "", 
            config: {
                type: "text",
                placeholder: "Add your research areas to enhance discoverability...",
                name: "researchAreas",
                label: "research areas",
                required: false  
            }
        },
        researchAreaTags: {
            tags: ["biology", "chemistry", "biochemistry"] // from props
        }        
    }

    state = JSON.parse(JSON.stringify(this.defaultState)) // because of array of tags

    validateInput = e => {
        e.persist()
        const { name, value } = e.target;
        this.setState(prevState => {            
            let {status, message} = authValidation(name, value)
            let valid = prevState.withValidation[name].validationRequired.touch ? 
                !status : prevState.withValidation[name].validationRequired.valid
            return {
                ...prevState,
                withValidation: {
                    ...prevState.withValidation,
                    [name]: {
                        ...prevState.withValidation[name],
                        value,
                        validationRequired: {
                            valid,
                            touch: e.type === "blur" ? true : prevState.withValidation[name].validationRequired.touch,
                            errorMsg: message
                        }
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
    
    onChangeCheckbox = (e) => {
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
    
    addTags = (e) => {
        let {value} = e.target
        value.toLowerCase()
        let {tags} = this.state.researchAreaTags

        if (e.key === "Enter"){
            e.preventDefault()
            if( tags.indexOf(value) > -1){
                this.setState(prevState => ({
                    ...prevState,
                    researchAreas:{
                        ...prevState.researchAreas,
                        value: ""
                }}))
            } else {
                tags.push(value)
                this.setState(prevState => ({
                    ...prevState,
                    researchAreas:{
                        ...prevState.researchAreas,
                        value: ""
                }}))
            }            
        }
    }

    deleteTags = e => {
        let {id} = e.target

        this.setState(prevState => {
            let tagArray = prevState.researchAreaTags.tags  
            tagArray.splice( tagArray.indexOf(id), 1)          
            return {
            ...prevState,
            researchAreaTags:{
                tags: tagArray
        }}})
    }


    submit = e => {
        e.preventDefault();       
        let {auth, id} = this.props
        const {email, firstName, lastName} = this.state.withValidation
        const values = {
            email: email.value,             
            fullName: `${firstName.value.trim()} ${lastName.value.trim()}`
        };
        if (this.formIsValid()){
            // console.log("submit", values)
            auth (values, `users/object/${id}/update`);
        }        
    }

    formIsValid = () => {
        let validForm = true

        Object.keys(this.state.withValidation).forEach(elem => {
            if (elem.required){
                let stateItem = this.state.withValidation[elem]
                let {status, message} = authValidation(stateItem.config.name, stateItem.value, this.state.withValidation.password.value)            

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
            }
        })

        validForm = JSON.stringify(this.state) !== JSON.stringify(this.defaultState) && validForm // to avoid unnecessary requests
       
        return validForm

    }    

    resetForm = () => {
        this.setState(JSON.parse(JSON.stringify(this.defaultState))) // because of array of tags
    }

    render () {
        console.log(this.state)

        let {isFetching, authErrorMessage } = this.props

        let {publicity, description, researchAreas} = this.state
        let errorMessage = authErrorMessage === "You should specify at least one updateble field in your request" ? 
            "" : "Something went wrong. Try again, please"
        let list = Object.keys(this.state.withValidation).map (elem => {
            let stateItem = this.state.withValidation[elem]
            return <InputField 
                key={elem}
                value = {stateItem.value}
                config = {stateItem.config}
                validationRequired = {stateItem.validationRequired}
                onBlur={this.validateInput}
                onChange={this.validateInput}                
                />
        })
        let listOfTags = this.state.researchAreaTags.tags.map (areaTag => {
            return <span 
                    key = {areaTag}
                    id = {areaTag}
                    onClick = {this.deleteTags} 
                >
                {areaTag}
            </span>
        })
        return (            
            <form onSubmit={this.submit} noValidate={true} >
                <ProfileAvatar />
                <div className="form__column" >
                    {authErrorMessage && <span> {errorMessage} </span>}
                    {list}
                </div>
                <div className="form__column" > 
                    <CheckboxField 
                        config = {publicity.config}
                        checked={publicity.checked} 
                        onChange={this.onChangeCheckbox} 
                    />
                    <TextareaField 
                        config = {description.config}
                        value={description.value}
                        onChange={this.onChangeInput}
                    />
                    <InputField 
                        value={researchAreas.value}            
                        config = {researchAreas.config} 
                        validationRequired = {{}}
                        onChange = {this.onChangeInput} 
                        onKeyDown = {this.addTags}
                    />
                    {listOfTags}
                </div>
                <button disabled={isFetching} className = "form-button" > 
                    Save 
                </button>
                <button disabled={isFetching} onClick={this.resetForm} className = "form-button" > 
                    Discard 
                </button>
            </form>           
        )
    }   
}

const mapStateToProps = state => {
	return {        
        // id: state.auth.user.id,
        isFetching: state.auth.isFetching,
        authError: state.auth.error,
        authErrorMessage: state.auth.message
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProlileForm);