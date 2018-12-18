/////////////
// modules //
/////////////
const express 		= require('express')
const router 		= express.Router()
const mongoose 		= require('mongoose')
const passport 		= require('passport')

/////////////
// Models  //
/////////////
const Profile 		= require('../../models/Profile')
const User 			= require('../../models/User')

/**
 * Get the current user's profile
 * @param  {[type]} '/'                          [description]
 * @param  {[type]} passport.authenticate('jwt', {            session:      false}) [description]
 * @param  {[type]} (request,                    response      [description]
 * @return {[type]}                              [description]
 */
router.get('/', passport.authenticate('jwt', { session:false }), (request, response) => {
	const errors = {}
	Profile.findOne({ user: request.user.id }).then(profile => {
		if(!profile) {
			errors.noProfile = 'There is no profile for the user'
			return response.status(404).json(errors)
		}

		response.json(profile)
	}).catch(error => {
		response.status(404).json(error)
	})
})


module.exports 		= router