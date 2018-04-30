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
import axios from "axios/index";

class SettingUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
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

    handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append( "file", this.state.file);
        return axios.post('http://127.0.0.1:8200/upload', formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleFileChange = ( e ) => {
        this.setState( { file: e.target.files[ 0 ] } );
    }

   /* handleClick = () => {

        var formData = new FormData();

        formData.append('file', this.state.file);

        let axiosConfig = {
            headers: {
                "Content-type": "multipart/form-data",
            }
        };

        return axios.post('http://127.0.0.1:8200/upload', formData, axiosConfig)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };*/

    render() {
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = imagePreviewUrl;
        } else {
            imagePreview = emptyUser;
        }
        return (
            <div>
                <div>
                    <Segment raised>
                        <Link to='/'> <Image src= {logo} size='small' /></Link>
                    </Segment>
                </div>
                <Form onSubmit={this.handleFormSubmit}>
                    <Image src= {imagePreview} size='medium' bordered circular />
                    <input
                        type="file"
                        id="file"
                        onChange={this.handleFileChange}
                    />
                    <button>Upload</button>
                </Form>
                <InputForm onInputValue={this.handleInput}  onValueForm={this.valueForm} data ={this.props.data}/>
                <Button className='buttonSave' onClick={this.handleClick} basic type="submit" >Save</Button>
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