import React from "react";

export const InputField = ({ config = {}, validationRequired = {}, ...rest }) => {
	const {name, type, label, placeholder, required} = config
	const {touch, errorMsg, valid} = validationRequired
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
				className = {touch && errorMsg && !valid ? "input-box__error" : "input-box__input"}
				{...rest} placeholder={placeholder} type={type} name={name} />
			{touch && errorMsg && !valid && 
				<span className ="input-box__error-message">
					{errorMsg}
				</span>
			}			
		</div>
	);
};

export const CheckboxField = ({ config, checked, ...rest }) => {
	const {type, name, value, label, message} = config
	return (
		<div className = "input-box">						
			<input {...rest} type={type} id={name} name={name} value={value} />
			{label && 
				<label htmlFor={name} className = "checkbox__label" >
					{label}
				</label>}
			{message && 
				<span className = "input-box__message" >
					{message}
				</span>}			
		</div>
	);
};

export const TextareaField = ({ config, ...rest }) => {
	const {name, label, placeholder, required, maxlength, cols, rows} = config
	return (
		<div className = "input-box">	
			{label && 
				<label className = "input-box__label" >
					{label} 
					{required && 
						<span className = "input-box__optional" > 
							(optional) 
						</span>} 
				</label>}					
			<textarea className = "input-box__text-area"
				name={name} placeholder={placeholder} 
				maxLength={maxlength} cols={cols} rows={rows} {...rest} />					
		</div>
	);
};