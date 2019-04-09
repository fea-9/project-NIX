import React, {Component} from "react";

import PropTypes from 'prop-types';

import * as actions from "../actions/auth"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import {authValidation} from "../Auth/authValidate";
import InputField from "../BaseComponents/Forms/Input";
import CheckboxField from "../BaseComponents/Forms/Checkbox";
import TextareaField from "../BaseComponents/Forms/Textarea";
import ProfileAvatar from "./ProfileAvatar";

class ProfileForm extends Component{
    
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
            checked: true, // from props
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
        const {auth, id} = this.props
        const {email, firstName, lastName} = this.state.withValidation
        const values = {
            email: email.value,             
            fullName: `${firstName.value.trim()} ${lastName.value.trim()}`
        };
        if (this.formIsValid()){
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
            return (
            <span 
                className = "tags"
                key = {areaTag} >
                    {areaTag}
                    <span className = "tags-delete" 
                        onClick = {this.deleteTags}
                        id = {areaTag} >
                            x
                    </span>
            </span>)
        })
        return (            
            <form className = "profile-form"
                onSubmit={this.submit} noValidate={true} >
                    <div className = "profile__form-box" >
                        <ProfileAvatar />
                        <div className="form-column" >
                            {authErrorMessage && 
                                <span className ="form__error-message" > 
                                    {errorMessage} 
                                </span>}
                            {list}
                        </div>
                        <div className="form-column" > 
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
                            <div className = "tags-box" >
                                {listOfTags}
                            </div>
                        </div>
                    </div>
                    <div className = "profile__buttons-box" >                    
                        <button disabled={isFetching} onClick={this.resetForm} className = "form-button profile-discard-button" > 
                            Discard 
                        </button>
                        <button disabled={isFetching} className = "form-button profile-submit-button" > 
                            Save 
                        </button>
                    </div>
            </form>           
        )
    }   
}

ProfileForm.propTypes = {
    user: PropTypes.object,
    id: PropTypes.string,
    isFetching: PropTypes.bool,
    authErrorMessage: PropTypes.string,
    auth: PropTypes.func
}

ProfileForm.defaultProps = {
    user: {
        created_at: 1553715252982,
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiY2EyMzU5MmItYjVkMi00MTQ1LThmNjMtMzFjODQyZjlhMDM2IiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20uY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNTU0ODAxNDU0LCJleHAiOjE1NTczOTM0NTR9.qTsOGV7xi1iDvVHegcMvaJKV2EFXCG0l8AT3AKnhcT0",
        project: "cms_edu",
        fullName: "my name",
        id: "ca23592b-b5d2-4145-8f63-31c842f9a036",
        email: "admin@admin.com.com"
    },
    id: "ca23592b-b5d2-4145-8f63-31c842f9a036",
    isFetching: false,
    authErrorMessage: null,
    auth: () => {console.log(`Auth submit ...`)}    
}

const mapStateToProps = state => {
	return {        
        id: state.auth.user.id,
        isFetching: state.auth.isFetching,
        user: state.auth.user,
        authErrorMessage: state.auth.message
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);