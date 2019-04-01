import React, {Component} from "react";

import { connect } from 'react-redux';

class ProfileHeader extends Component {
    getPeriodOfMembership = dateOfRegistration => {
        let diff = Math.floor(dateOfRegistration - new Date().getTime());
        let day = 1000 * 60 * 60 * 24;
    
        let days = Math.floor(diff/day);
        let months = Math.floor(days/31);
        let years = Math.floor(months/12);
        
        let message = "Member for "
        if (months > 12) {
            message += `${years} years`
        } else if (months < 12 && months > 1) {
            message += `${months} months`
        } else if (days < 31 && days > 1) {
            message += `${days} days`
        } else if (days < 1){
            message += "1 day"
        } 

        return message
    }

    render () {
        const {fullName, created_at} = this.props
        return (
            <>
                <h2>
                    {fullName}
                </h2>
                <p>
                    {this.getPeriodOfMembership(created_at)}
                </p>
            </>
        )
    }
}

const mapStateToProps = state => {
	return {        
        fullName: state.auth.user.fullName,
        created_at: state.auth.user.created_at
    };
};

export default connect(mapStateToProps, null)(ProfileHeader);