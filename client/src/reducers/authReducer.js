import { TEST_DISPATCH } from '../actions/types'

const initialState = {
	isAuthenticated: false, 
	user: {}, 
	hello: 'hello test'
}

export default function(state = initialState, action) {
	switch(action.type) {
		case TEST_DISPATCH:
			return {
				...state, 
				user: action.payload // Inserts userData from authActions
			}
		default: 
			return state
	}
}