import React, {Component} from "react";
// import "../../styles/components/_Profile.scss"

import {InputField} from "../Auth/input" // to change on BaseComponents

import AvatarEditor from 'react-avatar-editor'


class ProfileAvatar extends Component{    

    defaultState = {
        scale: 1, 
        image: "http://www.blackdesertbase.com/img/users/avatars/70.png" // from props in ideal
    }

    state = {
        ...this.defaultState
    }

    onZoomChange = (e) => {
        this.setState({scale: +e.target.value})
    }

    onSelectFile =  event =>  {                     
        var file = event.target.files [0] 
        let newImage         
        if ( file.type.split('/')[0] !== 'image' ) return                
        var fileReader = new FileReader ()
        fileReader.onloadend = ( e ) => { 
            newImage = e.target.result
            this.setState(prevstate => ({
                ...prevstate,
                image: newImage
            }))                                                                            
        }             
        fileReader.readAsDataURL ( file )
    }

    resetForm = () => {
        this.setState(this.defaultState) 
    }

    submit = (e) => {
        e.preventDefault(); // mock, no back-end
    }

    render () {
        const {scale, image} = this.state
        // console.log(this.state)
        return (
            <div>
                <AvatarEditor 
                    image={image}
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
                <button onClick = {this.resetForm} > Cancel </button>
                <button type="submit" onSubmit = {this.submit} > OK </button>
            </div>
        )
    }
}

export default ProfileAvatar;