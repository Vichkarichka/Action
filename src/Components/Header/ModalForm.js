import React, { Component } from 'react';
import { Button, Modal, Dropdown, Search } from 'semantic-ui-react';
import LoginInForm from '../Autorization/LoginInForm';
import SignUpForm from '../Autorization/SignUpForm';
import './ModalForm.css';
import { connect } from "react-redux";
import { changeLoginToSignUp, getValueCategory } from "../../Redux/Reducer";
import { getSections } from '../Function';

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

    componentDidMount() {
        getSections().then((initialCategory) => {
            this.props.getValueCategory(initialCategory);
        });
    };


    render() {
        if(!this.props.category) return null;
        let category = this.props.category;
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
                    <Dropdown className='sections' text='SECTIONS' options={category.map(categoryItem => ({
                        key: categoryItem.idCategoryLot,
                        value: categoryItem.idCategoryLot,
                        text: categoryItem.nameCategory,
                    }))} />
                        <Search/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.isLoginSuccess,
        location: state.location,
        category: state.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginToSignUp: (location) => dispatch(changeLoginToSignUp(location)),
        getValueCategory: (category) => dispatch(getValueCategory(category)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);