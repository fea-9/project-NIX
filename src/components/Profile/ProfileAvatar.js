import React, {Component} from "react";
import AvatarEditor from 'react-avatar-editor';
import PropTypes from 'prop-types';

import * as actions from "../actions/avatar";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import InputField from "../BaseComponents/Forms/Input"; 


class ProfileAvatar extends Component{    

    defaultState = {
        scale: this.props.scale, 
        src: this.props.src // from props in ideal
    }

    state = {
        ...this.defaultState
    }

    onZoomChange = (e) => {
        this.setState({scale: +e.target.value})
    }

    onSelectFile = event =>  {                     
        var file = event.target.files[0] 
        let newImage         
        if ( file.type.split('/')[0] !== 'image' ) return                
        var fileReader = new FileReader ()
        fileReader.onloadend = ( e ) => { 
            newImage = e.target.result
            this.setState(prevstate => ({
                ...prevstate,
                src: newImage
            }))                                                                            
        }             
        fileReader.readAsDataURL ( file )
    }

    resetForm = (e) => {
        e.preventDefault();
        const {resetAvatar} = this.props
        this.setState(this.defaultState) 
    }

    submit = (e) => {       
        e.preventDefault(); // mock, no back-end
        const {saveAvatar} = this.props
        saveAvatar(this.state)
    }

    render () {
        const {scale, src} = this.state
        
        return (
            <div className = "avatar-box" >
                <AvatarEditor 
                    className = "avatar-preview"
                    image={src}
                    width={250}
                    height={250}
                    border={0}
                    borderRadius={250}
                    color={[120, 120, 120, 0.6]} // RGBA
                    scale={scale}
                    rotate={0}               
                />
                <label htmlFor="avatar" className="avatar-select" >
                    +
                </label>
                <InputField config = {{
                        type: "file", name: "avatar", 
                    }} 
                    id="avatar" 
                    accept="image/png, image/jpeg" style={{display:'none'}} 
                    onChange = {this.onSelectFile}
                />
                <InputField 
                    className = "avatar-range"
                    config = {{
                        type: "range", name: "scale", 
                    }} step="0.01" min="1" max="2" value={scale} onChange={this.onZoomChange} 
                />
                <div className = "avatar__buttons-box" > 
                    <button className = "form-button avatar-cancel-button"
                        onSubmit = {this.resetForm}
                        onClick = {this.resetForm} > 
                            Cancel 
                    </button>
                    <button className = "form-button avatar-ok-button"
                        type="submit" onSubmit = {this.submit} onClick = {this.submit} > 
                            OK 
                    </button>
                </div>
            </div>
        )
    }
}
ProfileAvatar.propTypes = {
    src: PropTypes.string,
    scale: PropTypes.number,
    saveAvatar: PropTypes.func,
    resetAvatar: PropTypes.func
}
ProfileAvatar.defaultProps = {
    src: "http://www.blackdesertbase.com/img/users/avatars/70.png",
    scale: 1,
    saveAvatar: () => {console.log("SaveAvatar isn't set")},
    resetAvatar: () => {console.log("ResetAvatar isn't set")}
}

const mapStateToProps = state => {
    return ({
        src: state.avatar.src,
        scale: state.avatar.scale
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);