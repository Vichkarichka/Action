import React from 'react'
import ModalLoginInForm from '../Header/ModalForm';
import Header from '../Header/Header';
import { Button, Form, Message, Image } from 'semantic-ui-react';
import emptyUser from '../../Style/empty-avatar.jpg';
import InputForm from '../InputForm';
import './SettingUser.css';
import {connect} from "react-redux";
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../../Redux/Reducer";

class SettingUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            source: emptyUser,
            urlImage: '' ,
            idUsers: '',
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        if(this.props.data){
            this.setState({
                urlImage: this.props.data.urlImage,
                idUsers: this.props.data.idUsers,
            });
        }
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
    };

    closeForm() {
        this.setState({formValid: this.state.emailError && this.state.passwordError
            && this.state.confirmPasswordError && this.state.firstNameError && this.state.lastNameError },
        );
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let self = this;
        const formData = new FormData();
        formData.append( "file", this.state.file);
        formData.append('data', self.state.idUsers);

        axios.post('http://127.0.0.1:8200/upload', formData)
            .then(function (res) {
              axios.get('http://127.0.0.1:8200/upload/' + self.state.idUsers)
                    .then(res => {
                        self.props.saveUserAvatar(res.data.urlImage);
                    }).catch(function (error) {
                    console.log(error);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        return false;
    };

    handleFileChange = ( e ) => {
        this.setState( {file: e.target.files[0]} );
    };

    handleClick = () => {
        let self = this;
        let idUsers = this.props.data.idUsers;
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
        axios.post('http://127.0.0.1:8200/settingData/' + idUsers, postData, axiosConfig)
            .then(function (response) {
                self.setState({
                    success: true,
                });
                setTimeout(()=>self.setState({success: false}), 3000);
                self.props.loginValue(self.state);
            })
            .catch(function (error) {
                self.setState({
                    success: false,
                });
            });
    };

    render() {
        let avatar;
        if(this.props.data){
            avatar = "http://localhost:8200/" + this.props.data.urlImage;
        } else {
            avatar = this.state.source;
        }

        return (
            <div>
                <div>
                    <ModalLoginInForm/>
                <Header/>
                </div>
                <Form onSubmit={this.handleFormSubmit} className='FormImage'>
                    <Image src= {avatar} size='medium' bordered circular className = "avatar" />
                    <input
                        type="file"
                        id="file"
                        onChange={this.handleFileChange}
                    />
                    <Button className='buttonUpload' basic>Upload</Button>
                </Form>
                <InputForm onInputValue={this.handleInput}  onValueForm={this.valueForm} data ={this.props.data}/>
                {
                    this.state.success &&
                    <Message
                        success
                        header='Your user registration was successful'
                        content='You may now log-in with the email you have chosen'
                    />
                }
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

const mapDispatchToProps = (dispatch) => {
    return {
        loginValue: (data) => dispatch(loginValue(data)),
        saveUserAvatar: (urlImage) => dispatch(saveUserAvatar(urlImage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingUser);