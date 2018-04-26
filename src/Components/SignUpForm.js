import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {connect} from "react-redux";
import {changeLoginToSignUp, signup} from "../Redux/Reducer";
import axios from 'axios';

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            firstNameError: false,
            lastNameError: false,
        };
        this.requestServer = this.requestServer.bind(this);
    }

    onSubmit = () => {
        let temp=this;
        let { email, password, confirmPassword, firstName, lastName} = this.state;
        this.props.signup(email, password, confirmPassword, firstName, lastName);

        if(this.state.formValid) {
            this.requestServer().then(function () {
                if(temp.state.error) {
                    temp.setState({
                        email: '',
                    });
                } else {
                    temp.props.parentMethod();
                    /*var storedArray = JSON.parse(sessionStorage.getItem("items"));
                    console.log(storedArray);*/
                }
            });
        }
    };

    requestServer = () => {
        let self = this;
        let postData = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        });
        let axiosConfig = {
            headers: {
                "Content-type": "application/json",
            }
        };
      return axios.post('http://127.0.0.1:8200/signUp', postData, axiosConfig)
            .then(function (response) {
                console.log(response);
                self.setState({
                    error: false,
                });
            })
            .catch(function (error) {
                console.log(error);
                self.setState({
                    error: true,
                });
            });
    };

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    };

    validateField(fieldName, value) {

        let emailError = this.state.emailError;
        let passwordError = this.state.passwordError;
        let confirmPasswordError = this.state.confirmPasswordError;
        let firstNameError = this.state.firstNameError;
        let lastNameError = this.state.lastNameError;
        let reg;
        switch(fieldName) {

            case 'email':
                reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                emailError = reg.test(value);
                break;
            case 'password':
                reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                passwordError = reg.test(value);
                break
            case 'confirmPassword':
                reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                confirmPasswordError = reg.test(value);
                break;
            case 'firstName':
                reg = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
                firstNameError = reg.test(value);
                break;
            case 'lastName':
                reg = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
                lastNameError = reg.test(value);
                break;
            default:
                break;
        }
        this.setState({
            emailError: emailError,
            passwordError: passwordError,
            confirmPasswordError: confirmPasswordError,
            firstNameError: firstNameError,
            lastNameError: lastNameError,
        }, this.closeForm);
    }

    closeForm() {
        this.setState({formValid: this.state.emailError && this.state.passwordError
        && this.state.confirmPasswordError && this.state.firstNameError && this.state.lastNameError });
    }

    handleClick = () => {
        this.props.changeLoginToSignUp('LoginIn');
    };

    render() {
        let {email, password, confirmPassword, firstName, lastName} = this.state;
        let {loginError} = this.props;
        return(
                <Form className = 'formLoginIn'>
                    <h1>Create an account</h1>
                    <Form.Field>
                        <Form.Input placeholder='Email Address' onChange={this.handleInput} error={!this.state.emailError} name = 'email' value={email} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input type='password' placeholder='Password' onChange={this.handleInput} error={!this.state.passwordError} name = 'password' value={password} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input type='password' placeholder='Confirm Password' onChange={this.handleInput} error={!this.state.confirmPasswordError} name = 'confirmPassword' value={confirmPassword} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input placeholder='First Name' onChange={this.handleInput} error={!this.state.firstNameError} name = 'firstName' value={firstName} />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input placeholder='Last Name' onChange={this.handleInput} error={!this.state.lastNameError} name = 'lastName' value={lastName} />
                    </Form.Field>
                    <div className="message">
                        { loginError && <div>{loginError.message}</div> }
                    </div>
                    <Button type='submit' onClick = {this.onSubmit} >Sign Up</Button>
                <p className='TextForPeople'>Already have an account?
                    <a onClick={this.handleClick}>Log In</a>
                </p>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginToSignUp: (location) => dispatch(changeLoginToSignUp(location)),
        signup: (email, password, confirmPassword, firstName, lastName) =>
            dispatch(signup(email, password, confirmPassword, firstName, lastName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
