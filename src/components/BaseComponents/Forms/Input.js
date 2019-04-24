import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';

const InputField = ({ config = {}, validationRequired = {}, ...rest }) => {
	const {name, type, label, placeholder, required} = config
	const {touch, errorMsg, valid} = validationRequired
	const {disabled} = rest
	return (
		<div className = "input-box" >
			{label && 
				<label className = "input-box__label">
					{label} 
					{!required && 
						<span className = "input-box__optional" > 
							(optional) 
						</span>}
				</label>
			}			
			<input 
				className = {classNames(touch && errorMsg && !valid ? "input-box__error" : 
					disabled ? "input-box__disabled": "input-box__input"					
				)}
				{...rest} placeholder={placeholder} type={type} name={name} />
			{touch && errorMsg && !valid && 
				<span className ="input-box__error-message">
					{errorMsg}
				</span>
			}			
		</div>
	);
};

InputField.propTypes = {
	config: PropTypes.object,
	validationRequired: PropTypes.object
};
InputField.defaultProps = {
	config: {
		name: "",
		type: "text",
		label: "",
		placeholder: "",
		required: true
	},
	validationRequired: {
		touch: false, 
		errorMsg: "", 
		valid: true
	}
};

export default InputField;