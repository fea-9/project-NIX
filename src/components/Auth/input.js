import React from "react";

export const InputField = ({ label, type = "text", touch, errorMsg, valid, placeholder, labelSpan, ...rest }) => {

	return (
		<div>
			{label && <label>{label} {labelSpan && <span> {labelSpan} </span>}</label>}
			<div>
				<input {...rest} placeholder={placeholder} type={type} />
				{touch && errorMsg && !valid && <span>{errorMsg}</span>}
			</div>
		</div>
	);
};

export const CheckboxField = ({ label, type = "text", name, value, message, ...rest }) => {
	return (
		<div>						
			<input {...rest} type={type} id={name} name={name} value={value} />
			{label && <label for={name}>{label}</label>}
			{message && <span>{message}</span>}			
		</div>
	);
};

export const TextareaField = ({ label, type = "text", id, name, placeholder, message, labelSpan, ...rest }) => {
	return (
		<div>	
			{label && <label >{label} {labelSpan && <span> {labelSpan} </span>} </label>}					
			<textarea {...rest} name={name} placeholder={placeholder} />					
		</div>
	);
};