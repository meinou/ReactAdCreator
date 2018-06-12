import React, { Component } from 'react';

//const baseUrl = process.env.REACT_APP_HOST;
const baseUrl = 'localhost:8080';
//const baseUrl = 'http://ec2-18-188-3-4.us-east-2.compute.amazonaws.com:8080/' 

const LoginForm = () => (
    <form action={baseUrl + "/signin/facebook"} method="post">
        <h1>Please login</h1>
        <button type="submit">Login</button>
    </form>
);

const LogoutComponent = (props) => (
    <div>
        <h2>Welcome, {props.name}</h2>
        <button onClick={props.logout}>Logout</button>
    </div>
);

class Login extends Component {

    constructor(...args) {
        super(...args);
        this.state = {name: null};
    }

    componentDidMount() {
        // fetch(baseUrl + '/api/session', {credentials: 'include'})
        //     .then(res => res.json())
        //     .then(session => {
        //         if (this.props.updateState) {
        //             this.props.updateState(!!session.name);
        //         }
        //         this.setState({name: session.name});
        //     });
    }

    logout = () => {
        console.log("logout");
        fetch(process.env.REACT_APP_HOST + '/api/session', {method: 'delete', credentials: 'include'})
            .then(res => {
                this.setState({name: null});
                if (this.props.updateState) {
                    this.props.updateState(false);
                }
            });
    }

    render() {
        const profile = this.state.name ?
            <LogoutComponent name={this.state.name} logout={this.logout}/> :
            <LoginForm />;
        return (
            <div>
                {profile}
            </div>
        )
    }
}

export default Login;