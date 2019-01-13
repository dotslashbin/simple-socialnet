import { combineReducers } from 'redux'
import autheReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'

export default combineReducers({
	auth: autheReducer,
	errors: errorReducer, 
	profile: profileReducer
})