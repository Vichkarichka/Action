import React, { Component } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { login, changeLoginToSignUp } from '../Redux/Reducer';
import SocialButton from './SocialButton';
import './LoginInForm.css';

class LoginInForm extends Component {

    constructor(props){

        super(props);
        this.state = {
            email: '',
            password: '',
            checkSignUp: false,
        };
    }

    onSubmit = () => {
        let { email, password } = this.state;
        this.props.login(email, password);
        if(email.length !== 0 && password.length !== 0) {
            console.log(this.props);
            this.props.parentMethod();
        }
        this.setState({
            email: '',
            password: ''
        });
    };

    HandleClick = () => {
        this.props.changeLoginToSignUp('SignUp');
    };

    render() {
        let {email, password} = this.state;
        let {loginError} = this.props;
        console.log(this.props.isLoginSuccess);
        return(
            <Form className = 'formLoginIn'>
                <h1>Log in to your account</h1>
                <Form.Field>
                    <input placeholder='Enter your Email' onChange={e => this.setState({email: e.target.value})} value={email} />
                </Form.Field>
                <Form.Field>
                    <input placeholder='Password' onChange={e => this.setState({password: e.target.value})}  value={password} />
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
        changeLoginToSignUp: (location) => dispatch(changeLoginToSignUp(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginInForm);