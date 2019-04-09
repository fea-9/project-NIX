import React, { Component } from "react";
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { PageTemplate } from "../Templates/PageTemplate";
import Sidebar from "../Sidebar/Sidebar";
import ProfileForm from "../Profile/ProlileForm";
import {HeaderTemplate} from "../Header/Header";


class ProfilePage extends Component {
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
    componentDidMount() {}

    render() {
        const {fullName, created_at} = this.props
        return <PageTemplate 
                    sidebar={<Sidebar />} 
                    content={<ProfileForm />}  
                    header = {<HeaderTemplate 
                        title = {fullName}
                        details = {this.getPeriodOfMembership(created_at)} 
                    />} 
                />;
    }
}

ProfilePage.propTypes = {
    fullname: PropTypes.string,
    created_at: PropTypes.number 
}
ProfilePage.defaultProps = {
    fullname: "my name",
    created_at: 1553715252982
}

const mapStateToProps = state => {
	return {        
        fullName: state.auth.user.fullName,
        created_at: state.auth.user.created_at
    };
};

export default connect(mapStateToProps, null)(ProfilePage);