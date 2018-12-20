// import { TEST_DISPATCH } from '../actions/types'
import isEmpty from '../validation/is-empty'
import { SET_CURRENT_USER } from '../actions/types'

const initialState = {
	isAuthenticated: false, 
	user: {}, 
	hello: 'hello test'
}

export default function(state = initialState, action) {
	switch(action.type) {
		// case TEST_DISPATCH:
		// 	return {
		// 		...state, 
		// 		user: action.payload // Inserts userData from authActions
		// 	}
		case SET_CURRENT_USER:
			return {
				...state, 
				isAuthenticated: !isEmpty(action.payload), 
				user: action.payload
			}
		default: 
			return state
	}
}