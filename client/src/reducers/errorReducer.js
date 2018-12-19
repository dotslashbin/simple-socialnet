import { GET_ERRORS } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
	switch(action.type) {
		// case TEST_DISPATCH:
		// 	return {
		// 		...state, 
		// 		user: action.payload // Inserts userData from authActions
		// 	}
		case GET_ERRORS: 
			return action.payload
		default: 
			return state
	}
}