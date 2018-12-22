
/////////////////////////////
// Imported react packages //
/////////////////////////////
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
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
				</div>

				<Footer />
				</div>
			</Router>
		</Provider> 
    );
  }
}

export default App;
 