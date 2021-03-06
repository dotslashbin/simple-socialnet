import React, { Component } from 'react';
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

    	return (
    		<div>
    			The dashboardsuperfly
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

export default connect(null, { getCurrentProfile })(Dashboard)