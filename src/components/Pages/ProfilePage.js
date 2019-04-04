import React, { Component } from "react";
import { connect } from 'react-redux';

import { PageTemplate } from "../Templates/PageTemplate";
// import Sidebar from "../Sidebar/Sidebar";
import ProfileForm from "../Profile/ProlileForm";
import {HeaderTemplate} from "../Header/Header";
import ProfileHeader from "../Profile/ProfileHeader"
//import components profile, header, sidebar


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
        // sidebar={<Sidebar />} 
                content={<ProfileForm user = {
                    {
                    created_at: 1544026928182,
                    refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZTI4MGE2ZjYtMWE1Zi00ZTZmLThmZGUtZjViNDE3NzMzNDdmIiwiZW1haWwiOiJzb21lQGVtYWlsLmNvbSJ9LCJpYXQiOjE1NDQwMjY5MjgsImV4cCI6MTU0NjYxODkyOH0.13PAt8IPYx3P6qjzTJmqY4fg-fjGjZjEbN3GIrMIV_A",
                    project: "cms_edu",
                    fullName: "my name",
                    id: "e280a6f6-1a5f-4e6f-8fde-f5b41773347f",
                    email: "some@email.com"
                } } />}  
                header = {<HeaderTemplate 
                    title = {fullName}
                    details = {this.getPeriodOfMembership(created_at)}        
                    
                //  component = {<ProfileHeader created_at = "1544026928182"         
                //  fullName = "my name"/>}
                />} 
            />;
    }
}

const mapStateToProps = state => {
	return {        
        // fullName: state.auth.user.fullName,
        // created_at: state.auth.user.created_at
    };
};

export default connect(mapStateToProps, null)(ProfilePage);