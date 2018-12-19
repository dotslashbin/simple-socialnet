import axios from 'axios'
// import { TEST_DISPATCH } from './types'
import { GET_ERRORS } from './types'

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