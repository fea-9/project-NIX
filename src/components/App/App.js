import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage';

import ProfileForm from "../Profile/ProlileForm"

class App extends Component {
  render() {
    return (
      <div className="App">
       <ProfileForm user = {
         {
          created_at: 1544026928182,
          refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZTI4MGE2ZjYtMWE1Zi00ZTZmLThmZGUtZjViNDE3NzMzNDdmIiwiZW1haWwiOiJzb21lQGVtYWlsLmNvbSJ9LCJpYXQiOjE1NDQwMjY5MjgsImV4cCI6MTU0NjYxODkyOH0.13PAt8IPYx3P6qjzTJmqY4fg-fjGjZjEbN3GIrMIV_A",
          project: "cms_edu",
          fullName: "my name",
          id: "e280a6f6-1a5f-4e6f-8fde-f5b41773347f",
          email: "some@email.com"
      }
       } />
      </div>
    );
  }
}

export default App;
