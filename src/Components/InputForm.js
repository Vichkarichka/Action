import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import {connect} from "react-redux";
import {changeLoginToSignUp, signup} from "../Redux/Reducer";
import {ErrorMessage} from "./ErrorMessage";

class InputForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            emailError: true,
            passwordError: true,
            confirmPasswordError: true,
            firstNameError: true,
            lastNameError: true,
        };
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => {
            this.validateField(name, value);
            this.props.onInputValue(this.state)
        })
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
            && this.state.confirmPasswordError && this.state.firstNameError && this.state.lastNameError },
            this.props.onValueForm(this.state));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.duplex){
            this.setState({
                email: '',
            });
        }
        if(nextProps.pass)
        {
            this.setState({
                password: '',
                confirmPassword: '',
            });
        }
    }

    componentDidMount(){
        if(this.props.data){
            this.setState({
                email: this.props.data.email,
                firstName: this.props.data.firstName,
                lastName: this.props.data.lastName,
            });
        }
    }

    render() {
        let {email, password, confirmPassword, firstName, lastName} = this.state;
        return(
            <Form className = 'formLoginIn'>
                <h1>Create an account</h1>
                <Form.Field>
                    <Form.Input placeholder='Email Address' onChange={this.handleInput}  error={!this.state.emailError} name = 'email' value={email} />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);