/////////////
// Modules //
/////////////
const jwtStrategy 	= require('passport-jwt').Strategy
const ExtractJwt	= require('passport-jwt').ExtractJwt
const mongoose 		= require('mongoose')
const User 			= mongoose.model('users')
const keys 			= require('../config/keys')

const options 		= {}

////////////////
// Initialize //
////////////////
options.jwtFromRequest 	= ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey 	= keys.secretOrKey

module.exports = passport => { 
	// console.log(passport)
	// console.log("hello")
	passport.use(
		new jwtStrategy(options, (jwt_payload, done) => {
			// console.log(jwt_payload)
			/**
			 * The jwt_payload contains the user object that authenticated
			 */
			console.log("FINDING USER WITH ID: " + jwt_payload.id)
			User.findById(jwt_payload.id).then(user => {
				if(user) {
					return done(null, user)
				} else {
					return done(null, false)
				}
			}).catch(error => {
				console.log("there was an error in finding a user")
			})
	}))
}
