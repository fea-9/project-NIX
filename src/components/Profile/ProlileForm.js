import React, {Component} from "react";
import PropTypes from 'prop-types';

import * as authActions from "../actions/auth";
import * as avatarActions from "../actions/avatar";
import { connect } from 'react-redux';

import { Scrollbars } from "react-custom-scrollbars";

import {authValidation} from "../../utils/authValidate";
import InputField from "../BaseComponents/Forms/Input";
import CheckboxField from "../BaseComponents/Forms/Checkbox";
import TextareaField from "../BaseComponents/Forms/Textarea";
import ProfileAvatar from "./ProfileAvatar";

class ProfileForm extends Component{
    
    defaultState = {
        avatar: {
            scale: this.props.scale, 
            src: this.props.src, // from server in ideal
            sourceSrc: this.props.sourceSrc
        },
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
                },
                disabled: true
            }           
        },        
        publicity: {
            checked: this.props.publicity, 
            config: {
                type: "checkbox",
                label: "Public Profile",
                message: "Let other users know you are open to connecting. You can customize a note about this just above",
                value: "public",
                name: "publicity",
            }          
        },        
        description: {            
            value: this.props.description, 
            config: {
                type: "textarea",
                label: "description",
                required: false,
                name: "description",
                placeholder: "Add some information about yourself...",
                maxlength: 500,
                cols: 5,
                rows: 7
            },            
            maxlength: 250                        
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
            tags: this.props.researchAreaTags 
        }        
    }

    state = JSON.parse(JSON.stringify(this.defaultState)) // because of array of tags

    // VALIDATION OF FORM INPUTS
    validateInput = e => {
        e.persist()
        const { name, value } = e.target;
        this.setState(prevState => {            
            const {status, message} = authValidation(name, value)
            const valid = prevState.withValidation[name].validationRequired.touch ? 
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
    
    // WORK WITH TAGS
    addTags = (e) => {
        if(e.key !== "Enter") return;
        
        else if (e.key === "Enter"){
            e.preventDefault()
            const value = e.target.value.toLowerCase().trim()            
            const {tags} = JSON.parse(JSON.stringify(this.state.researchAreaTags))

            let tagsFromInput = value.split(/\.|\,|\;/g)

            tagsFromInput.forEach( elem => {
                let tag = elem.trim();
                if( tags.indexOf(tag) > -1 ||  
                    /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*\s\*]{2,25}$/.test(value)){
                        this.setState(prevState => ({
                            ...prevState,
                            researchAreas:{
                                ...prevState.researchAreas,
                                value: ""
                        }}))
                } else {                     
                    tags.push(tag)
                    this.setState(prevState => ({
                        ...prevState,
                        researchAreas:{
                            ...prevState.researchAreas,
                            value: ""
                        },
                        researchAreaTags:{
                            tags: tags
                        }
                    }))                    
                }         
            })                
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

    // SUBMIT, VALIDATION, RESET OF FORM 
    submit = e => {
        e.preventDefault(); 
        const {updateUserRequest, id, saveAvatar} = this.props
        const {email, firstName, lastName} = this.state.withValidation
        const values = {
            email: email.value,             
            fullName: `${firstName.value.trim()} ${lastName.value.trim()}`
        };
        saveAvatar(this.state.avatar) // no backend
        if (this.formIsValid()){
            updateUserRequest(localStorage.getItem("access_token"), id, values);            
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

        validForm = JSON.stringify(this.state.withValidation) !== JSON.stringify(this.defaultState.withValidation) && validForm 
        // to avoid unnecessary requests. this.state.withValidation - not proper, 
        // for future data structure to be changed according to backend
       
        return validForm;
    }   
    
    resetForm = (e) => {
        e.preventDefault();
        this.props.resetAvatar();
        this.setState(JSON.parse(JSON.stringify(this.defaultState))) // because of array of tags
    }

    // WORK WITH AVATAR EDITOR, INCLUDING SAVE, RESET
    onZoomChange = (e) => {
        e.persist()
        this.setState(prevState => ({
            ...prevState,
            avatar: {
                ...prevState.avatar,
                scale: +e.target.value
            }
        }));
    }

    onSelectFile = event =>  { 
        const file = event.target.files[0];
        let newImage;        
        if ( !file || file.type.split('/')[0] !== 'image' ) return;                
        const fileReader = new FileReader ();
        fileReader.onloadend = ( e ) => {
            newImage = e.target.result;
            this.setState(prevState => ({
                ...prevState,
                avatar: {
                    ...prevState.avatar,
                    sourceSrc: newImage,
                    src: newImage
                }
            }));                                                                          
        }             
        fileReader.readAsDataURL ( file );
        event.target.value = ""
    }

    onPositionChangeOfAvatar = (data) => {
        this.setState(prevState => ({
            ...prevState,
            avatar:{
                ...prevState.avatar,
                src: data
            }
        }))
    }

    resetFormAvatar = (e) => {
        e.preventDefault();
        const {resetAvatar} = this.props; 
        const {avatar} = this.state;        
        if (avatar.src === this.defaultState.src && avatar.scale === this.defaultState.scale) return; 
        else {
            resetAvatar()
            this.setState({...this.defaultState})
        };
        
    }

    saveFormAvatar = (data) => {   // mock, no back-end
        const {saveAvatar, src, scale} = this.props;
        const {avatar} = this.state;  
        if (avatar.src === src && avatar.scale === scale) return;
        else {
            saveAvatar({src: data,
                scale: avatar.scale});
            this.setState(prevState => ({
                ...prevState,
                avatar:{
                    ...prevState.avatar,
                    src: data
                }
            }))
        }            
    }
   

    render () {
        const {isFetching, authErrorMessage } = this.props
        const {publicity, description, researchAreas, avatar} = this.state
        const errorMessage = authErrorMessage === "You should specify at least one updateble field in your request" ? 
            "" : "Something went wrong. Try again, please"
        const list = Object.keys(this.state.withValidation).map (elem => {
            let stateItem = this.state.withValidation[elem]
            return <InputField 
                        key={elem}
                        value = {stateItem.value}
                        config = {stateItem.config}
                        validationRequired = {stateItem.validationRequired}
                        onBlur={this.validateInput}
                        onChange={this.validateInput} 
                        disabled = {stateItem.disabled ? stateItem.disabled : false}               
                    />
        })
        const listOfTags = this.state.researchAreaTags.tags.map (areaTag => {
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
                </span>
            )
        })
        return (            
            <form className = "profile-form"
                onSubmit={this.submit} noValidate={true} >
                    <div className = "profile__form-box" >
                        <ProfileAvatar 
                            src = {avatar.sourceSrc}
                            scale = {avatar.scale}
                            onSelectFile = {this.onSelectFile}
                            onZoomChange = {this.onZoomChange}
                            onPositionChangeOfAvatar = {this.onPositionChangeOfAvatar}
                            saveAvatar = {this.saveFormAvatar}
                            resetAvatar = {this.resetFormAvatar}
                        />
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
                                <Scrollbars>
                                    {listOfTags}
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                    <div className = "profile__buttons-box" >                    
                        <button disabled={isFetching} 
                            onClick={this.resetForm}
                            onSubmit={this.resetForm} 
                            className = "form-button profile-discard-button" > 
                                Discard 
                        </button>
                        <button disabled={isFetching} 
                            className = "form-button profile-submit-button" > 
                                Save 
                        </button>
                    </div>
            </form>           
        )
    }   
}

ProfileForm.propTypes = {
    publicity: PropTypes.bool,
    description: PropTypes.string,
    researchAreaTags: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.object,
    id: PropTypes.string,
    isFetching: PropTypes.bool,
    authErrorMessage: PropTypes.string,
    updateUserRequest: PropTypes.func,
    src: PropTypes.string,
    sourceSrc: PropTypes.string,
    scale: PropTypes.number,
    saveAvatar: PropTypes.func,
    resetAvatar: PropTypes.func
}

ProfileForm.defaultProps = {
    publicity: true, // mock
    description: "I am open to connecting and meeting new potential collaborators.", // mock
    researchAreaTags: ["biology", "chemistry", "biochemistry"], // mock
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
    updateUserRequest: () => {console.log(`Auth submit ...`)},
    src: "http://www.blackdesertbase.com/img/users/avatars/70.png",
    sourceSrc: "http://www.blackdesertbase.com/img/users/avatars/70.png",
    scale: 1,
    saveAvatar: () => {console.log("SaveAvatar isn't set")},
    resetAvatar: () => {console.log(`ResetAvatar isn't set`)}    
}

const mapStateToProps = state => ({ 
    src: state.avatar.src,
    sourceSrc: state.avatar.sourceSrc,
    scale: state.avatar.scale,       
    id: state.auth.user.id,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    authErrorMessage: state.auth.message    
});

const mapDispatchToProps = { ...authActions, ...avatarActions };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);