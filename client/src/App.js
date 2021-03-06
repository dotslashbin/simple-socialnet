
/////////////////////////////
// Imported react packages //
/////////////////////////////
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
import { Provider } from 'react-redux'
import store from './store'

//////////////////////////
// Imported components  //
//////////////////////////
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
// import logo from './logo.svg';

import './App.css';

//////////////////////
// Check for token  //
//////////////////////
if(localStorage.jwtToken) {
	// Set the auth token header auth
	setAuthToken()

	// Decode the token and get user info and expiration
	const decoded = jwt_decode(localStorage.jwtToken)

	// Set user isAuthenticated
	store.dispatch(setCurrentUser(decoded))

	// Check for token expired
	const currentTime = Date.now() / 1000
	if(decoded.exp < currentTime)
	{
		store.dispatch(logoutUser())
		store.dispatch(clearCurrentProfile());
		/**
		 * TODO: 
		 *  - Create the profile
		 *  - Redirect to the login page
		 * 
		 */
	}
}

class App extends Component {
  render() {
    return (
    	// This was renamed from above
    	<Provider store={ store }> 
			<Router>
				<div className="App">
					<Navbar />
				{/* commented to be replaced with route <Landing />*/}
				{ /*You need the "exact" to load  only the exact component */ }
				<Route exact path="/" component={ Landing } />

				<div className="container">
					<Route exact path="/Register" component={ Register }/>
					<Route exact path="/Login" component={ Login }/>
					<Route exact path="/Dashboard" component={ Dashboard }/>
				</div>

				<Footer />
				</div>
			</Router>
		</Provider> 
    );
  }
}

export default App;
 