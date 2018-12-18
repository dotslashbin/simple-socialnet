/////////////
// Modules //
/////////////
const Validator 	= require('validator')
const isEmpty 		= require('./is-empty')

////////////////////
// Included files //
////////////////////
// import isEmpty from "./is-empty"

module.exports = function validateRegisterInput(data) {
	let errors = {}

	if(!Validator.isLength(data.name, { min:2, max: 30 })) {
		errors.name = 'Invalid number of characters. Use: 2 - 30'
	}

	return {
		errors, 
		isValid: isEmpty(errors)
	}
} 