///////////////////////////////
// Imported react components //
///////////////////////////////
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends Component {

	onLogoutClick(e) {
		e.preventDefault()
		this.props.clearCurrentProfile();
		this.props.logoutUser()
	}

	render() {

		const { isAuthenticated, user } = this.props.auth

		const authLinks = (
			<ul className="navbar-nav ml-auto">
			  <li className="nav-item">
				<a href='#' onClick={this.onLogoutClick.bind(this)} className="nav-link">
					<img src={ user.avatar } title="where's your gravatar" style={{ width: '25px', margin: '5px' }} className="rounded-circle" alt="the alt must be filled in"/>
					Logout
				</a>

			  </li>
			</ul>
		)

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
			  <li className="nav-item">
			    <Link className="nav-link" to="Register">Sign Up</Link>

			  </li>
			  <li className="nav-item">
			    <Link className="nav-link" to="Login">Login</Link>
			  </li>
			</ul>
		)

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">Simple Social</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						<ul className="navbar-nav mr-auto">
						  <li className="nav-item">
						    <Link className="nav-link" to="/profiles">
						    	Developers
						    </Link>
						  </li>
						</ul>

						{ isAuthenticated? authLinks:guestLinks }
					</div>
				</div>
			</nav>
		)
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired, 
	auth: PropTypes.object.isRequired
}

const mapStateToProperties = (state) => ({
	auth: state.auth

})

export default connect(mapStateToProperties, { logoutUser, clearCurrentProfile })(Navbar)