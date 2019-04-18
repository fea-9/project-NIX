import React, {Component} from "react";
import PropTypes from 'prop-types';

import AvatarEditor from 'react-avatar-editor';

import InputField from "../BaseComponents/Forms/Input"; 


class ProfileAvatar extends Component {
    static propTypes = {
        src: PropTypes.string,
        sourceSrc: PropTypes.string,
        scale: PropTypes.number,
        saveAvatar: PropTypes.func,
        resetAvatar: PropTypes.func,
        onPositionChangeOfAvatar: PropTypes.func
    }
    static defaultProps = {
        src: "http://www.blackdesertbase.com/img/users/avatars/70.png",
        sourceSrc: "http://www.blackdesertbase.com/img/users/avatars/70.png",
        scale: 1,
        saveAvatar: () => {console.log("SaveAvatar isn't set")},
        resetAvatar: () => {console.log(`ResetAvatar isn't set`)},  
        onPositionChangeOfAvatar: () => {console.log(`onPositionChangeOfAvatar isn't set`)}   
    }

    setNewSrc = callback => {
        if (this.editor) {
        // If you want the image resized to the canvas size (a HTMLCanvasElement)
            const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL();
            callback(canvasScaled);
        }
    }

    setEditorRef = (editor) => this.editor = editor;
    
    render(){
        const {src, scale, onSelectFile, onZoomChange, saveAvatar, resetAvatar, onPositionChangeOfAvatar} = this.props;
        return (
            <div className = "avatar-box" >
                <AvatarEditor 
                    ref={this.setEditorRef}
                    className = "avatar-preview"
                    image={src}
                    onPositionChange={e => this.setNewSrc(onPositionChangeOfAvatar)}
                    width={250}
                    height={250}
                    border={0}
                    borderRadius={250}
                    color={[120, 120, 120, 0.6]} 
                    scale={scale}
                    rotate={0}               
                />
                <label htmlFor="avatar" className="avatar-select" >
                    +
                </label>
                <InputField 
                    config = {{
                        type: "file", name: "avatar", 
                    }} 
                    id="avatar" 
                    accept="image/png, image/jpeg" style={{display:'none'}} 
                    onChange = {onSelectFile}
                />
                <InputField 
                    className = "avatar-range"
                    config = {{
                        type: "range", name: "scale", 
                    }} 
                    step="0.01" min="1" max="3" value={scale} onChange={onZoomChange} 
                />
                <div className = "avatar__buttons-box" > 
                    <button className = "form-button avatar-cancel-button"
                        onSubmit = {resetAvatar}
                        onClick = {resetAvatar} > 
                            Cancel 
                    </button>
                    <button className = "form-button avatar-ok-button"
                        type="submit" 
                        onSubmit = {e => { e.preventDefault();
                                            this.setNewSrc(saveAvatar)}} 
                        onClick = {e => { e.preventDefault();
                                            this.setNewSrc(saveAvatar)}} > 
                            OK 
                    </button>
                </div>
            </div>
        )
    }    
}

export default ProfileAvatar;