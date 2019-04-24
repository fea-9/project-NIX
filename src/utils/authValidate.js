export const authValidation = (name, value, matchTo=null, formType = "signIn") => {
	const error = {};
	error.status = false

	if (name === "firstName" || name === "lastName"){
        error.message = value.length > 50 ? `Too long value for ${name}` : 
			/[^a-zA-Z0-9]/i.test(value) ? "Only alphanumeric characters" : "" ;
		error.status = error.message ? true : false;
    }

	if (name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z]{2,4})?\.[A-Z]{2,4}$/i.test(value)) {
		error.message = "Invalid email address";
		error.status = true;
	} 

	if (name === "password" && formType === "signUp") {				
        error.message = value.length < 6 ? "Password should contain at least one special character and one number and be at least 6 characters long" :        
            !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value) ?
			"Password should contain at least one special character and one number" : 
			"";
		error.status = error.message ? true : false;		
	} 

	if (name === 'confirmPassword'){
		error.message = matchTo ? (value !== matchTo ? "Passwords don't match" : "") : "No password to match"
		error.status = error.message ? true : false;
	}

	if (!value || value.trim() === "") {
		error.message = "Required";
		error.status = true;
	}
	
	return error;
};