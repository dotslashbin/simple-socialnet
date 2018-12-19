//////////////////////////
// Imports from modules //
//////////////////////////
import React, { Component } from 'react'
import axios from 'axios'


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

		// Testing
		axios.post('/api/users/register', newUser)
			.then(response => console.log (response.data))
			.catch(errors => this.setState({ errors: errors.response.data }))
	
	}

	render() {
		return(
			<div className="register">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <h1 className="display-4 text-center">Sign Up</h1>
			          <p className="lead text-center">Create your DevConnector account</p>
			          <form noValidate method='POST' onSubmit={this.onSubmit}>
			            <div className="form-group">
			              <input type="text" className="form-control form-control-lg" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} required />
			            </div>
			            <div className="form-group">
			              <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange}/>
			              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
			            </div>
			            <div className="form-group">
			              <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
			            </div>
			            <div className="form-group">
			              <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange}/>
			            </div>
			            <input type="submit" className="btn btn-info btn-block mt-4"/>
			          </form>
			        </div>
			      </div> 
			    </div>
		  	</div>
		)
	}
}

export default Register