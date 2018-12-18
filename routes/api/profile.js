/////////////
// modules //
/////////////
const express 		= require('express')
const router 		= express.Router()
const mongoose 		= require('mongoose')
const passport 		= require('passport')

// Load validation
const validateProfileInput = require('../../validation/profile')

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
	Profile.findOne({ user: request.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
		if(!profile) {
			errors.noProfile = 'There is no profile for the user'
			return response.status(404).json(errors)
		}

		response.json(profile)
	}).catch(error => {
		response.status(404).json(error)
	})
})
 
/**
 * Get Profile by handle
 * @param  {[type]} '/handle/:handle'            [description]
 * @param  {[type]} (request,                    response      [description]
 * @return {[type]}                              [description]
 */
router.get('/handle/:handle', (request, response) => {
    const errors = {}

    Profile.findOne({ handle:request.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile with that handle'
            return response.status(404).json(errors)
        }

        response.json(profile)
    })                                                                                          
    .catch(error => response.status(404).json(error))
})

/**
 * Fetches user by id
 * @param  {[type]} '/user/:user_id' [description]
 * @param  {[type]} (request,        response      [description]
 * @return {[type]}                  [description]
 */
router.get('/user/:user_id', (request, response) => {
    const errors = {}

    Profile.findOne({ user:request.params.user_id })
    .then(profile => {
        if(!profile) {
            errors.nonprofile = 'There is no profile for this user'
            response.status(404).json(errors)
        }

        response.json(profile)

    }).catch(error => respons.status(404).json(error))
})

/**
 * create or edit user profile 
 * @param  {[type]} '/create-profile'            [description]
 * @param  {[type]} passport.authenticate('jwt', {            session:      false }) [description]
 * @param  {[type]} (request,                    response      [description]
 * @return {[type]}                              [description]
 */
router.post('/', passport.authenticate('jwt', { session: false }), (request, response) => {

	const { errors, isValid } = validateProfileInput(request.body)

	//////////////////////
	// Check validation //
	//////////////////////
	if(!isValid) {
		// return any errors
		return response.status(400).json(errors)
	}

	// Get fields
    const profileFields 										= {};
    profileFields.user 											= request.user.id;
    if (request.body.handle) profileFields.handle 				= request.body.handle;
    if (request.body.company) profileFields.company 			= request.body.company;
    if (request.body.website) profileFields.website 			= request.body.website;
    if (request.body.location) profileFields.location 			= request.body.location;
    if (request.body.bio) profileFields.bio 					= request.body.bio;
    if (request.body.status) profileFields.status 				= request.body.status;
    if (request.body.githubUsername)
      profileFields.githubUsername 								= request.body.githubUsername;
    // Skills - Spilt into array
    if (typeof request.body.skills !== 'undefined') {
      profileFields.skills 										= request.body.skills.split(',');
    }

    // Social
    profileFields.social 										= {};
    if (request.body.youtube) profileFields.social.youtube 		= request.body.youtube;
    if (request.body.twitter) profileFields.social.twitter 		= request.body.twitter;
    if (request.body.facebook) profileFields.social.facebook 	= request.body.facebook;
    if (request.body.linkedin) profileFields.social.linkedin 	= request.body.linkedin;
    if (request.body.instagram) profileFields.social.instagram 	= request.body.instagram;

    Profile.findOne({ user: request.user.id }).then(profile => {

    	if(profile) {
			// This means an update
			console.log(profileFields)
    		Profile.findOneAndUpdate({ user:request.user.id }, { $set: profileFields }, { new: true })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
    			console.log("Profile updated ... ")
    			response.json(profile)
    		})
    	} else {

            Profile.findOne({ hande:profileFields.handle })
            .populate('user', ['name', 'avatar'])
            .then(profileFound => {
                if(profileFound) {
                    errors.handle = 'Profile already exists'
                    response.status(400).json(errors)
                } else {
                    new Profile(profileFields).save().then(profile => response.json(profile)).catch(error => {
                        console.log("ERROR IN CREATING A PROFILE ... ")
                        response.status(404).json(error)
                    })        
                }
            })

            
    		// This means creating a new profile
    		
    		// // Check to see if the handle exists to avoid duplication
    		// Profile.findOne({ handle: profileFields.handle }).then(Profile => {
    		// 	if(profile) {
    		// 		errors.handle = 'Handle already existst'
    		// 		respond.status(400).json(errors)
    		// 	}

      //           new Profile(profileFields).save().then(profile => response.json(profile)).catch(error => {
      //               console.log("Error saving ... ")
      //               response.json(error)
      //           })

    		// 	// Save Profile 
    		// 	// new profile(profileFields).save().then(savedProfile => respond.json(savedProfile))
    		// }).catch(error => {
      //           console.log("error on find one ...")
      //           response.status(404).json(error)
      //       })
    	}
    })
})


module.exports 		= router