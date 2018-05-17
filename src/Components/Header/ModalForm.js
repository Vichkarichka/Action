import React, { Component } from 'react';
import { Button, Modal, Search } from 'semantic-ui-react';
import LoginInForm from '../Autorization/LoginInForm';
import SignUpForm from '../Autorization/SignUpForm';
import './ModalForm.css';
import { connect } from "react-redux";
import { changeLoginToSignUp } from "../../Redux/Reducer";
import Sections from "./Sections";

class ModalForm extends Component {

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
            <div>
                <Modal
                    trigger={<Button className='loginButton'  onClick={this.handleOpen}>LOGIN IN</Button>}
                    open={this.state.modalOpen}
                    basic
                    size='fullscreen'
                >
                    <Button className='exitButton' basic color='red' content='Red' onClick={this.handleClose}>Exit</Button>
                    {location}
                </Modal>
                  <Sections/>
                        <Search/>
            </div>
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
        changeLoginToSignUp: (location) => dispatch(changeLoginToSignUp(location)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);