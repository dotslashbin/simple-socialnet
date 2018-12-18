/////////////
// modules //
/////////////
const express 		= require('express');
const router 		= express.Router();
const gravatar 		= require('gravatar')
const bcrypt 		= require('bcrypt')
const jwt 			= require('jsonwebtoken')
const passport 		= require('passport')

///////////////////////////
// Load input validation //
///////////////////////////
const validateRegisterInput 	= require('../../validation/register.js')

//////////////////////
// Access to others //
//////////////////////
const keys 			= require('../../config/keys')

////////////
// Models //
////////////
const User 		= require('../../models/User')

router.get('/test', (requests, response) => response.send('from user file'))

/**
 * @param  {[type]}
 * @param  {Function}
 * @return {[type]}
 */
router.post('/register', (requests, response) => {
	const { errors, isValid } = validateRegisterInput(requests.body)

	//////////////////////
	// Check Validation //
	//////////////////////
	if(!isValid) {
		console.log('Validation failed ... ')
		return response.status(400).json(errors)
	}

	User.findOne({ email: requests.body.email })
	.then((user) => {
		if(user) {
			// return response.status(400).json({ email: 'Email already exists'})
			errors.email = 'Email already exists'
			return response.status(400).json(errors)
		} else {
			//////////////////////////////
			// Fetches the gravatar url //
			//////////////////////////////
			const avatar = gravatar.url(requests.body.email, {
		        s: '200', // Size
		        r: 'pg', // Rating
		        d: 'mm' // Default
	      	});

			//////////////////////////////////////////
			// Creates the user object to be saved  //
			//////////////////////////////////////////
			const newUser = new User({
				name: requests.body.name, 
				email: requests.body.email,
				avatar, 
				password: requests.body.password
			});

			///////////////////////////////////////////////////////////////////
			// Encrypts the user's password before actually saving the data  //
			///////////////////////////////////////////////////////////////////
			bcrypt.genSalt(10, (error, salt) => {
				bcrypt.hash(newUser.password, salt, (error, hash) => {
					newUser.password = hash
					newUser.save()
					.then(user => response.json(user))
					.catch(error => console.log(error))
				})
			})
		}
	})
})

/**
 * 
 * @param  requests
 * @param  responses
 * @return callback
 */
 router.post('/login', (requests, response) => {

 	const email 	= requests.body.email
 	const password 	= requests.body.password

 	console.log(requests.body)

	//////////////////////////////////////////////////////////////
	// Used ES6 shortcut since 'email' is the same as the value //
	//////////////////////////////////////////////////////////////
 	User.findOne({email}).then((user) => {



		////////////////////////////////
 		// checks if the email exists //
		////////////////////////////////
 		if(!user) {
 			return response.status(404).json({ email: 'User / Email not found'})
 		}

		//////////////////////////////////////////////////////////
 		// Used bcrypt matcing since hte password are encrypted //
		//////////////////////////////////////////////////////////
 		bcrypt.compare(password, user.password).then((isMatched) => {
 			if(isMatched) {
 				// return response.json({ message: 'Success'} )
 				// 
 				/**
				 * The user has matched, so you will need to create a jwt payload and sign a token
				 */
				
				//////////////////////////
				// Creating the payload //
				//////////////////////////
				const payload = { id: user.id, name: user.name, avatar: user.avatar }
				
				///////////////////////
				// Signing the token //
				///////////////////////
				jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (error, token) => {
					response.json({ success:true, token: 'Bearer ' + token})
				}) 
 			} else {
 				return response.status(400).json({ password: 'Password incorrect' })
 			}
 		})

 	})
 })

/**
 * Get method to return teh current user 
 * @param  {[type]} '/current'                   [description]
 * @param  {[type]} passport.authenticate('jwt', {            session:false}) [description]
 * @param  {[type]} (request,                    response      [description]
 * @return {[type]}                              [description]
 */
router.get('/current', passport.authenticate('jwt', { session:false }), (request, response) => {
	// response.json({ message:'Success' })
	// response.json(request.user)
	/////////////////////////
	// Cleanup the results //
	/////////////////////////
	response.json({ id: request.user.id, name: request.user.name, email: request.user.email })
})

module.exports = router