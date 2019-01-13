import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 
import { getCurrentProfile } from '../../actions/profileActions'

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile()
	}

    render() {

    	const { user } = this.props.auth
    	const { profile, loading } = this.props.profile

    	let dashboardContent

    	if( profile === null || loading ) {
    		dashboardContent = <h4>LOADING ... </h4>
    	} else {
    		dashboardContent = (
    			<div>
    				<p className="lead text-muted">Welcome { user.name }</p>
    				<p>Create a profile</p>
    				<Link to="/create-profile" className="btn btn-lg btn-info">
    				Create
    				</Link>
    			</div>
			)
    	}

    	return (
    		<div>
    			{ dashboardContent }
    		</div>
		)
    }
}

Dashboard.PropTypes = {
	getCurrentProfile: PropTypes.func.isRequired, 
	auth: PropTypes.object.isRequired, 
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile, 
	auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)