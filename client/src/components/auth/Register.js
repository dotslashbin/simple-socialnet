//////////////////////////
// Imports from modules //
//////////////////////////
import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { withRouter } from 'react-router-dom'
// import axios from 'axios'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class Register extends Component {
	constructor() {
		super()
		this.state = {
			name: '', 
			email: '', 
			password: '', 
			password2: '', 
			errors: {}
		}

		/////////////////////////////////////////////////////////////////
		// Methods binding: Necessary to identify the 'this' from call //
		/////////////////////////////////////////////////////////////////
		// this.onChange = this.onChange.bind(this) // Method 1
		// this.onSubmit = this.onSubmit.bind(this) // Method 1
	}

	/**
	 * Method 1: where you need to bind the method on the constructor
	 * [onChange description]
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	// onChange(event) {

	// 	// This is basically the same as setting value for each field in the state
	// 	this.setState({ [event.target.name]: event.target.value });
	// }
	
	/**
	 * The same onChange method but there is no need to bind since it is in ES6
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	onChange = (event) => { this.setState({ [event.target.name]: event.target.value }); }

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/Dashboard')
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors})
		}
	}

	/**
	 * Submitting the registration
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	// onSubmit(event) {
	// 	event.preventDefault()

	// 	const newUser =  {
	// 		name: this.state.name,
	// 		email: this.state.email, 
	// 		password: this.state.password, 
	// 		password2: this.state.password2
	// 	}

	// 	alert(newUser)

	// 	console.log(newUser)
	// }
	// 
	onSubmit = (event) => {
		event.preventDefault()

		const newUser =  {
			name: this.state.name,
			email: this.state.email, 
			password: this.state.password, 
			password2: this.state.password2
		}

		/**
		 * This was used before redux was implemented
		 */
		// Testing
		// axios.post('/api/users/register', newUser)
		// 	.then(response => console.log (response.data))
		// 	.catch(errors => {
		// 		this.setState({ errors: errors.response.data })
		// 	})
			// .catch(errors => console.log(errors.response.data))
	
		// this.props.registerUser(newUser)

		/**
		 * Added history
		 */
		this.props.registerUser(newUser, this.props.history)
	
	}

	render() {

		const { errors } = this.state

		// const { user } = this.props.auth

		return(
			<div className="register">
				{/*{user ? user.name : null }*/}
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <h1 className="display-4 text-center">Sign Up</h1>
			          <p className="lead text-center">Create your DevConnector account</p>
			          <form noValidate method='POST' onSubmit={this.onSubmit}>
			            <TextFieldGroup placeholder="Ngalan" name="name" value={ this.state.name } onChange={ this.onChange } error={ errors.name } required />
 	 		            <TextFieldGroup placeholder="Email" name="email" value={ this.state.email } onChange={ this.onChange } error={ errors.email } type="email" info="This is an email field" />
 	 		            <TextFieldGroup placeholder="Password" name="password" value={ this.state.password } onChange={ this.onChange } error={ errors.password } type="password" />
 	 		            <TextFieldGroup placeholder="Confirm password" name="password2" value={ this.state.password2 } onChange={ this.onChange } error={ errors.password2 } type="password" />
			            <input type="submit" className="btn btn-info btn-block mt-4"/>
			          </form>
			        </div>
			      </div> 
			    </div>
		  	</div>
		)
	}
}

/**
 * This is mapping all of prop types for good practice
 * @type {Object}
 */
Register.propTypes = {
	registerUser: PropTypes.func.isRequired, 
	auth: PropTypes.object.isRequired, 
	errors: PropTypes.object.isRequired
}

/**
 * This is so you can use this.props.<something from the state>
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
const mapStateToProps = (state) => ({
	auth: state.auth, // This comes from authReducer
	errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))