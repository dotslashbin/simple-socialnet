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

export const registerUser = userData => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(response => console.log(response.data))
		.catch(errors =>
			dispatch({
				type: GET_ERRORS, 
				payload: errors.response.data
			})
		)
}