const express 	= require('express');
const router 	= express.Router();
const gravatar 	= require('gravatar')
const bcrypt 	= require('bcrypt')

/**
 * Models
 */
const User 		= require('../../models/User')

router.get('/test', (req, res) => res.send('from user file'))

/**
 * Registration
 */
router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email })
	.then((user) => {
		if(user) {
			return res.status(400).json({ email: 'Email already exists'})
		} else {
			const avatar = gravatar.url(req.body.email, {
		        s: '200', // Size
		        r: 'pg', // Rating
		        d: 'mm' // Default
	      	});

			const newUser = new User({
				name: req.body.name, 
				email: req.body.email,
				password: req.body.password,
				avatar
			});

			console.log(`New User: ${newUser}`)

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					newUser.password = hash
					newUser.save().then(user => res.json(user)).catch(err => console.log(err))
				})
			})

			// todo: delete this
			// newUser.save()
		}
			
	})
})

module.exports = router