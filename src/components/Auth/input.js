import React from "react";

export const InputField = ({ label, type = "text", touch, error, valid, placeholder, ...rest }) => {
	return (
		<div>
			<label>{label}</label>
			<div>
				<input {...rest} placeholder={placeholder} type={type} />
				{touch && error && !valid && <span>{error}</span>}
			</div>
		</div>
	);
};