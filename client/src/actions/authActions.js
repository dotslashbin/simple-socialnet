import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// import { TEST_DISPATCH } from './types'
import { GET_ERRORS, SET_CURRENT_USER } from './types'


//////////////
// Register //
//////////////
// Original TESTING sample
// export const registerUser = (userData) => {
// 	return {
// 		type: TEST_DISPATCH, 
// 		payload: userData
// 	}
// }

/**
 * Registeres's Users
 * @param  {[type]} userData [description]
 * @param  {[type]} history  [description]
 * @return {[type]}          [description]
 */
export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(response => history.push('/login'))
		.catch(errors =>
			dispatch({
				type: GET_ERRORS, 
				payload: errors.response.data
			})
		)
}

/**
 * Logs the user in 
 * @param  {[type]} userData [description]
 * @return {[type]}          [description]
 */
export const loginUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(result => {
			// Save to local
			const { token } = result.data
			localStorage.setItem('jwtToken', token)

			// Set token to auth header
			setAuthToken(token)

			// Decode token to get user data
			const decoded = jwt_decode(token)

			dispatch(setCurrentUser(decoded))
		})
		.catch(errors =>
			dispatch({
				type: GET_ERRORS, 
				payload: errors.response.data
			})
		)
}

/**
 * Deletes the variables from localStorage which effectively 
 * logs the user out
 * @return {[type]} [description]
 */
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken')

	// Remove the auth header for future requests
	setAuthToken(false)

	// Set the current user to emtpy
	dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER, 
		payload: decoded
	}
}