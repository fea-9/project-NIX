import React, {Component} from "react";

import { connect } from 'react-redux';

class ProfileHeader extends Component {
    getPeriodOfMembership = dateOfRegistration => {
        let diff = Math.floor(new Date().getTime() - dateOfRegistration);
        let day = 1000 * 60 * 60 * 24;
    
        let daysAll = Math.floor(diff/day);
        let days = daysAll % 31
        let months = Math.floor(daysAll/31);
        let years = Math.floor(months/12);
        
        let message = "Member for "
        if (years > 1) {
            message += `${years} years `
        } else if (years === 1){
            message += `1 year `
        }
        if (months > 1) {
            message += `${months} months `
        } else if (months === 1){
            message += `1 month `
        }
        if (days > 1) {
            message += `${days} days`
        } else if (days < 1){
            message += "1 day"
        } 

        return message
    }

    render () {
        const {fullName, created_at} = this.props
        const nameCapitalized = fullName.split(" ").map(elem => elem[0].toUpperCase() + elem.slice(1)).join(" ")
        return (
            <>
                <h2 className = "header__profile-name" >
                    {nameCapitalized}
                </h2>
                <p className = "header__profile-details" >
                    {this.getPeriodOfMembership(created_at)}
                </p>
            </>
        )
    }
}

const mapStateToProps = state => {
	return {        
        // fullName: state.auth.user.fullName,
        // created_at: state.auth.user.created_at
    };
};

export default connect(mapStateToProps, null)(ProfileHeader);