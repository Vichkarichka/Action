import React, { Component } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { login, changeLoginToSignUp, loginValue } from '../Redux/Reducer';
import SocialButton from './SocialButton';
import './LoginInForm.css';
import axios from "axios/index";

class LoginInForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            checkSignUp: false,
            emailError: false,
            passwordError: false,
        };
    }

    onSubmit = () => {

        let temp = this;
        let { email, password } = this.state;


        if(this.state.emailError && this.state.passwordError) {
           this.serverRequest().then(function () {
               if(temp.state.error) {
                   temp.setState({
                       email: '',
                   });
               } else {
                   temp.props.login(email, password);
                   temp.props.parentMethod();
               }
           });
        }
        this.setState({
            email: '',
            password: ''
        });

    };

    serverRequest = () => {
        let self = this;
        let postData = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        });

        let axiosConfig = {
            headers: {
                "Content-type": "application/json",
            }
        };

       return axios.post('http://127.0.0.1:8200/loginIn', postData, axiosConfig)
            .then(function (response) {
                window.sessionStorage.setItem("items", JSON.stringify(response.data.token));
                self.props.loginValue(response.data);
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
    }

    validateField(fieldName, value) {

        let emailError = this.state.emailError;
        let passwordError = this.state.passwordError;

        switch(fieldName) {
            case 'email':
                let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                emailError = re.test(value);
                break;
            case 'password':
                let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                passwordError = reg.test(value);
                break;
            default:
                break;
        }
        this.setState({
            emailError: emailError,
            passwordError: passwordError
        });
    }

    HandleClick = () => {
        this.props.changeLoginToSignUp('SignUp');
    };

    render() {
        let {email, password} = this.state;
        let {loginError} = this.props;
        return(
            <Form className = 'formLoginIn' error={this.state.formError}>
                <h1>Log in to your account</h1>
                <Form.Field>
                    <Form.Input  placeholder='Enter your Email' error={!this.state.emailError} onChange={this.handleInput} name = 'email' value={email}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input  placeholder='Password' error={!this.state.passwordError} onChange={this.handleInput} name = 'password'  value={password} />
                </Form.Field>
                <div className="message">
                    { loginError && <div>{loginError.message}</div> }
                </div>
                <Button type='submit' onClick = {this.onSubmit} >Login In</Button>
                <p className='TextForPeople'>or signup with your social account</p>
                <SocialButton/>
                <p className='TextForPeople'>Don't have an account?
                    <a onClick={this.HandleClick}>Create now</a>
                </p>
            </Form>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError,
        data: state.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        changeLoginToSignUp: (location) => dispatch(changeLoginToSignUp(location)),
        loginValue: (data) => dispatch(loginValue(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginInForm);