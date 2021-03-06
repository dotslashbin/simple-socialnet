import axios from 'axios'

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types'

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading())
	axios.get('/api/profile')
		.then(response => dispatch({ type: GET_PROFILE, payload: response.data }))
		.catch(error => dispatch({ type:GET_PROFILE, payload:{} }))
}

// Profile Loading 
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
}

// Clear 
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	}
}