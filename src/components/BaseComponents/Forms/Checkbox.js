import React from "react";
import PropTypes from "prop-types"

const CheckboxField = ({ config, checked, ...rest }) => {
	const {type, name, value, label, message} = config
	return (
		<div className = "input-box">						
			<input 
				className = "input-box__checkbox" checked = {checked}
				{...rest} type={type} id={name} name={name} value={value} />
			{label && 
				<label htmlFor={name} className = "input-box__checkbox-label" >
					{label}
				</label>}
			{message && 
				<span className = "input-box__message" >
					{message}
				</span>}			
		</div>
	);
};

CheckboxField.propTypes = {
	config: PropTypes.object,
	checked: PropTypes.bool
};
CheckboxField.defaultProps = {
	config: {
		name: "",
		type: "checkbox",
		label: "",
		value: "",
		message: ""
	},
	checked: false
};
export default CheckboxField