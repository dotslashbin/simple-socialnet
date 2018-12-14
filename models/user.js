const mongoose 		= require('mongoose')
const schema 		= mongoose.Schema

// Create scheme
const UserSchema 	= new Schema({
	name: {
		type: String,
		required: true
	}
	email: {
		type: String, 
		required: true
	}, 
	password: {
		type: String, 
		required: true
	}, 
	avatar: {
		type: String, 
		required: false
	}, 
	date: {
		type: Date, 
		default: Date.now()
	}
})

module.exports = User = mongoose.model('users', UserSchema)