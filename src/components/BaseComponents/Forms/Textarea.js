import React from "react";
import PropTypes from "prop-types"

const TextareaField = ({ config, ...rest }) => {
	const {name, label, placeholder, required, maxlength, cols, rows} = config
	return (
		<div className = "input-box">	
			{label && 
				<label className = "input-box__label" >
					{label} 
					{!required && 
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
TextareaField.propTypes = {
	config: PropTypes.object,
	checked: PropTypes.bool
};
TextareaField.defaultProps = {
	config: {
		name: "",
		label: "",
		placeholder: "",
		required: true,
		maxlength: 250,
		cols: 25,
		rows: 7
	},
	checked: false
};

export default TextareaField;