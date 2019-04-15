import React from "react";
import AvatarEditor from 'react-avatar-editor';

import InputField from "../BaseComponents/Forms/Input"; 


const ProfileAvatar = (props) => {

        const {src, scale, onSelectFile, onZoomChange, saveAvatar, resetAvatar} = props;

        return (
            <div className = "avatar-box" >
                <AvatarEditor 
                    className = "avatar-preview"
                    image={src}
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
                    step="0.01" min="1" max="2" value={scale} onChange={onZoomChange} 
                />
                <div className = "avatar__buttons-box" > 
                    <button className = "form-button avatar-cancel-button"
                        onSubmit = {resetAvatar}
                        onClick = {resetAvatar} > 
                            Cancel 
                    </button>
                    <button className = "form-button avatar-ok-button"
                        type="submit" onSubmit = {saveAvatar} onClick = {saveAvatar} > 
                            OK 
                    </button>
                </div>
            </div>
        )    
}
export default ProfileAvatar;