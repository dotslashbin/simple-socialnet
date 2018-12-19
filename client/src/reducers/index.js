import { combineReducers } from 'redux'
import autheReducer from './authReducer'
import errorReducer from './errorReducer'

export default combineReducers({
	auth: autheReducer,
	errors: errorReducer
})