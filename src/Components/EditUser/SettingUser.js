import React from 'react'
import ModalLoginInForm from '../Header/ModalForm';
import Header from '../Header/Header';
import { Button, Form, Image } from 'semantic-ui-react';
import emptyUser from '../../Style/empty-avatar.jpg';
import InputForm from '../InputForm';
import './SettingUser.css';
import {connect} from "react-redux";
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../../Redux/Reducer";
import moment from "moment/moment";
import {ErrorObject} from "../ErrorObject";
import {ErrorMessage} from "../ErrorMessage";
import { Redirect } from 'react-router-dom';

class SettingUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            source: emptyUser,
            urlImage: '' ,
            idUsers: '',
            Error: false,
            redirect: false,
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
        const formData = new FormData();
        formData.append( "file", this.state.file);
        formData.append('data', this.state.idUsers);

        axios.post('http://127.0.0.1:8200/upload', formData)
            .then((res) => {
              axios.get('http://127.0.0.1:8200/upload/' + this.state.idUsers)
                    .then(res => {
                        this.props.saveUserAvatar(res.data.urlImage);
                    }).catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log(error);
            });
        return false;
    };

    handleFileChange = ( e ) => {
        this.setState( {file: e.target.files[0]} );
    };



    handleClick() {

       let email = this.state.email;
       let firstName = this.state.firstName;
       let lastName = this.state.lastName;

        if(!this.state.formValid) {
            this.setState({
                Error: true,
                errorName: ErrorObject.FORM_VALID,
            });
            setTimeout(()=>this.setState({Error: false}), 3000);
        } else if(email.length === 0 || firstName.length === 0 || lastName.length === 0 ) {
            this.setState({
                Error: true,
                errorName: ErrorObject.EMPTY_FIELD,
            });
            setTimeout(()=>this.setState({Error: false}), 3000);
        } else {
            this.setState({
                formValid: true,
            }, this.requestServer);
        }
    };

    requestServer = () => {
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
            .then((response) => {
                this.setState({
                    redirect: true,
                });
                this.props.loginValue(this.state);
            })
            .catch((error) => {
                this.setState({
                    redirect: false,
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

        if(this.state.redirect) {
            return (
                <Redirect push to = '/'/>
            )
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
                <div style={{position: 'relative'}} >
                    <Button className='buttonSave' onClick={this.handleClick} basic type="submit" >Save</Button>
                    {
                        this.state.Error &&
                        ErrorMessage(this.state.errorName)
                    }
                </div>
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