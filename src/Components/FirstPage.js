import React, {Component} from 'react';
import { Segment, Image, Button, Dropdown, Icon } from 'semantic-ui-react';
import ModalLoginInForm from './ModalLoginInForm';
import logo from '../Style/logo.jpeg';
import { Redirect, Link } from 'react-router-dom';
import './FirstPage.css';
import { connect } from "react-redux";
import axios from "axios/index";

class FirstPage extends Component {

    constructor(props){
        super(props);
        this.state ={
            redirectToSetting: false,
        };
        this.handleSetting = this.handleSetting.bind(this);
    }

    handleSetting = () => {
        let temp = this;
        var storedArray = JSON.parse(sessionStorage.getItem("items"));

        let postData = JSON.stringify({
            token: storedArray,
        });
        let axiosConfig = {
            headers: {
                "Content-type": "application/json",
            }
        };

        axios.post('http://127.0.0.1:8200/authorization', postData, axiosConfig)
            .then(function (response) {
                temp.setState({
                    redirectToSetting: true,
                });
            })
            .catch(function (error) {
                console.log(error);
               temp.setState({
                    redirectToSetting: false,
                });
            });
    };

    render() {
        const { redirectToSetting } = this.state;
        if (redirectToSetting) {
            return (
                <Redirect to='/lk' />
            )
        }
        return (
            <div>
                <ModalLoginInForm/>
                <Segment raised>
            <span>
            <Link to='/'> <Image src={logo} size='small'/></Link>
                {
                    this.props.isLoginSuccess &&
                        <Dropdown text={this.props.data.email}  floating labeled button icon={<Image src = {"http://localhost:8200/"+ this.props.data.urlImage} style = {{width:50, height:50, marginTop:-15 }} />} className='privateAccount'>
                            <Dropdown.Menu>
                                <Dropdown.Item>New Lot</Dropdown.Item>
                                <Dropdown.Item>Edit Permissions</Dropdown.Item>
                                <Dropdown.Item>History Lot's</Dropdown.Item>
                                <Dropdown.Item onClick={this.handleSetting}>
                                    Setting
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Header>Exit</Dropdown.Header>
                                <Dropdown.Item>Log out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                }
            </span>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginSuccess: state.isLoginSuccess,
        email: state.email,
        data: state.data,
    };
};

export default connect(mapStateToProps, null)(FirstPage);
