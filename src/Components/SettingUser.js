import React from 'react'
import { Segment, Image, Input } from 'semantic-ui-react';
import logo from '../Style/logo.jpeg';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import emptyUser from '../Style/empty-avatar.jpg';
import InputForm from './InputForm';
import './SettingUser.css';
import {changeLoginToSignUp, login, loginValue} from "../Redux/Reducer";
import {connect} from "react-redux";

class SettingUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

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
        console.log(data);
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

    _handleSubmit(e) {
        e.preventDefault();

    }
    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = imagePreviewUrl;
        } else {
            imagePreview = emptyUser;
        }
        console.log(this.props.data);
        return (
            <div>
                <div>
                    <Segment raised>
                        <Link to='/'> <Image src= {logo} size='small' /></Link>
                    </Segment>
                </div>
                <Form onSubmit={this._handleSubmit}>
                    <Image src= {imagePreview} size='medium' bordered circular />
                    <Input type="file" size='mini' onChange={this._handleImageChange} />
                    <Button basic type="submit" onClick={this._handleSubmit}>Upload Image</Button>
                </Form>
                <InputForm onInputValue={this.handleInput}  onValueForm={this.valueForm} data ={this.props.data}/>
                <Button className='buttonSave' basic type="submit" >Save</Button>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.data,
    };
};

export default connect(mapStateToProps, null)(SettingUser);