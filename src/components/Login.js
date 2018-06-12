import React, { Component } from 'react';
import userService from '../services/userService';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                userName: "",
                password: "",
                email: ""
            }
            
        }
        this.loginChangeHandler = this.loginChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.loginClickHandler = this.loginClickHandler.bind(this);
        this.registerClickHandler = this.registerClickHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
    }

    loginChangeHandler(event) {
        const user = this.state.user;
        user.userName = event.target.value;
        this.setState({user});
    }

    emailChangeHandler(event) {
        const user = this.state.user;
        user.email = event.target.value;
        this.setState({user});
    }

    passwordChangeHandler(event) {
        const user = this.state.user;
        user.password = event.target.value;
        this.setState({user});
    }

    loginClickHandler() {
        userService.getByName(this.state.user.userName)
                        .then((response) => {
                            let user = response.data;
                            if (user.password === this.state.user.password){
                                console.log("approved");
                                this.props.getUser(user);
                            }
                            else {
                                console.log("refused");
                            }

                            this.setState({user});
                        })
                        .catch(console.error);
    }

    registerClickHandler() {
        let warning = "";
        
        if (this.state.user.password === "") {
            warning = "password is required";
        }
        if (this.state.user.email === "") {
            warning = "email is required";
        }
        if (this.state.user.username === "") {
            warning = "username is required";
        }
        this.setState({warning});
        console.log(warning);
        if (warning && warning !== "") return;

        userService.getByName(this.state.user.userName)
        .then((response) => {
            
            if (response.data) {
                warning = "This username already exists";
                this.setState({warning});
                console.log(warning);
                return;
            }
            else {
                userService.createUser(this.state.user)
                .then((response) => {
                    let user = response.data;
                    if (user.id) {
                        console.log("created");
                        this.props.getUser(user);
                    }
                    else {
                        console.log("did not created");
                    }
                })
                .catch((err) => {
                    console.log("smth went wrong ");
                    console.log(err);
                });
            }
                
        });

        
    }
    
    render() {
        const form = (<div className="form">
                        <div className="form-group">
                            <input className="form-control" placeholder="username" type="text" value = {this.state.user.userName} onChange={this.loginChangeHandler} /> 
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="password" type="password" value = {this.state.user.password} onChange={this.passwordChangeHandler} /> 
                        </div>

                        <div className="form-group">
                            <input className="form-control" placeholder="email" type="email" value = {this.state.password} onChange={this.emailChangeHandler} /> 
                        </div>

                        <div className="form-group">
                            {!!this.state.warning && this.state.warning !== "" ? this.state.warning : ""}
                        </div>
                        <button className="btn btn-info" onClick={this.loginClickHandler}>Login</button>
                        
                        <button className="btn btn-info" onClick={this.registerClickHandler}>Register</button>
                    
                     </div>);
        
        return (<div> {form}</div>);
    }
}

export default Login;