import React, { Component } from 'react';
import { Button, Modal} from 'semantic-ui-react';
import LoginInForm from './LoginInForm';
import SignUpForm from './SignUpForm';
import './ModalLoginInForm.css';
import {connect} from "react-redux";
import {changeLoginToSignUp} from "../Redux/Reducer";

class ModalLoginInForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            response: '',
        };
    }
    handleOpen = () => {
        this.setState({ modalOpen: true })
    };

    handleClose = () => {
        this.setState({ modalOpen: false })
    };


    render() {

    let location;
        switch (this.props.location) {
            case "SignUp":
               location = <SignUpForm parentMethod={this.handleClose}/>;
                break;
            case "LoginIn":
                location = <LoginInForm  parentMethod={this.handleClose}/>;
                break;
            default:
                location = <LoginInForm parentMethod={this.handleClose}/>;
                break;
        }
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>LOGIN IN</Button>}
                open={this.state.modalOpen}
                closeIcon={<Button onClick={this.handleClose}>Exit</Button>}
                basic
                size='fullscreen'
            >
               {location}
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.isLoginSuccess,
        location: state.location,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginToSignUp: (location) => dispatch(changeLoginToSignUp(location))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalLoginInForm);