import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import {connect} from "react-redux";
import {changeLoginToSignUp, signup} from "../../Redux/Reducer";
import axios from 'axios';
import InputForm from '../InputForm';
import './SignUpForm.css';

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            doubleEmail: false,
        };
        this.requestServer = this.requestServer.bind(this);
    }

    onSubmit = () => {
        let temp = this;
        let { email, password, confirmPassword, firstName, lastName} = this.state;
        this.props.signup(email, password, confirmPassword, firstName, lastName);
        if(this.state.formValid && this.props.isSignUpSuccess) {
            temp.setState({
                wrongPassword: false,
            });
            this.requestServer().then(function () {
                if(temp.state.error) {
                    temp.setState({
                        doubleEmail:true,
                    });
                } else {
                    temp.setState({
                        doubleEmail:false,
                    });
                    temp.props.parentMethod();
                }
            });
        } else {
            temp.setState({
                wrongPassword: true,
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

    handleClick = () => {
        this.props.changeLoginToSignUp('LoginIn');
    };

    handleInput = (value) => {
        this.setState({
            email: value.email,
            password: value.password,
            confirmPassword: value.confirmPassword,
            firstName: value.firstName,
            lastName: value.lastName,
        });
    };

    valueForm = (data) => {
        this.setState({
            emailError: data.emailError,
            passwordError: data.passwordError,
            confirmPasswordError: data.confirmPasswordError,
            firstNameError: data.firstNameError,
            lastNameError: data.lastNameError,
        },this.closeForm);
    }

    closeForm() {
        this.setState({formValid: this.state.emailError && this.state.passwordError
                && this.state.confirmPasswordError && this.state.firstNameError && this.state.lastNameError },
        );
    }

    render() {
        return(
               <div>
                   <InputForm onInputValue={this.handleInput}  onValueForm={this.valueForm} duplex = {this.state.doubleEmail} pass = {this.state.wrongPassword}/>
                   <Button  className='buttonSignUp' type='submit' onClick = {this.onSubmit} >Sign Up</Button>
                   <p className='TextForPeople'>Already have an account?
                       <a onClick={this.handleClick}>Log In</a>
                   </p>
               </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginError: state.loginError,
        isSignUpSuccess: state.isSignUpSuccess,
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
