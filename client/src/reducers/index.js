import { combineReducers } from 'redux'
import autheReducer from './authReducer'

export default combineReducers({
	auth: autheReducer
})