import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        //must call super for subclass, react component need super(props) call
        super(props);

        // be sure that "this" refers to the class - this is undefined
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //states are how you create variables in react
        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
    // update username of the state
        this.setState({
            username: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
        }
    
    
        console.log(user);

        // send user info to backend, post request
        // endpoint expects json in request body(2nd arg)
        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data)); // a promise

        // set username back to blank
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}