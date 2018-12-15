const express 		= require('express');
const router 		= express.Router();
const gravatar 		= require('gravatar')
const bcrypt 		= require('bcrypt')

/**
 * Models
 */
const User 		= require('../../models/User')

router.get('/test', (requests, response) => response.send('from user file'))

/**
 * Registration
 */
router.post('/register', (requests, response) => {
	User.findOne({ email: requests.body.email })
	.then((user) => {
		if(user) {
			return response.status(400).json({ email: 'Email already exists'})
		} else {
			const avatar = gravatar.url(requests.body.email, {
		        s: '200', // Size
		        r: 'pg', // Rating
		        d: 'mm' // Default
	      	});

			const newUser = new User({
				name: requests.body.name, 
				email: requests.body.email,
				avatar, 
				password: requests.body.password
			});

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
 * Login
 */
 router.post('/login', (requests, response) => {

 })

module.exports = router