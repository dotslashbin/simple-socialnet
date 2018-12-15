const express 		= require('express');
const router 		= express.Router();
const gravatar 		= require('gravatar')
const bcrypt 		= require('bcrypt')

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
	User.findOne({ email: requests.body.email })
	.then((user) => {
		if(user) {
			return response.status(400).json({ email: 'Email already exists'})
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
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					newUser.password = hash
					newUser.save()
					.then(user => response.json(user))
					.catch(err => console.log(err))
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
 			return response.status(404).json({ email: 'User / Email does not exists' })
 		}

		//////////////////////////////////////////////////////////
 		// Used bcrypt matcing since hte password are encrypted //
		//////////////////////////////////////////////////////////
 		bcrypt.compare(password, user.password).then((isMatched) => {
 			if(isMatched) {
 				return response.json({ message: 'Success'} )
 			} else {
 				return response.status(400).json({ password: 'Password incorrect' })
 			}
 		})

 	})
 })

module.exports = router