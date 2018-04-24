import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {connect} from "react-redux";
import {changeLoginToSignUp} from "../Redux/Reducer";

class SignUpForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    HandleClick = () => {
        this.props.changeLoginToSignUp('LoginIn');
    };

    render() {
        let {email, password} = this.state;
        return(
                <Form className = 'formLoginIn'>
                    <h1>Create an account</h1>
                    <Form.Field>
                        <input placeholder='Email Address' onChange={e => this.setState({email: e.target.value})} value={email} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password' onChange={e => this.setState({password: e.target.value})}  value={password} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder=' Confirm Password' onChange={e => this.setState({password: e.target.value})}  value={password} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='First Name' onChange={e => this.setState({password: e.target.value})}  value={password} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Last Name' onChange={e => this.setState({password: e.target.value})}  value={password} />
                    </Form.Field>
                    <Button type='submit' onClick = {this.onSubmit} >Sign Up</Button>
                <p className='TextForPeople'>Already have an account?
                    <a onClick={this.HandleClick}>Log In</a>
                </p>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginToSignUp: (location) => dispatch(changeLoginToSignUp(location))
    };
};
export default connect(null, mapDispatchToProps)(SignUpForm);
