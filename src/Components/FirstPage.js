import React, {Component} from 'react';
import { Segment, Image, Button, Dropdown, Icon } from 'semantic-ui-react';
import ModalLoginInForm from './ModalLoginInForm';
import logo from '../Style/logo.jpeg';
import { Redirect, Link } from 'react-router-dom';
import './FirstPage.css';
import { connect } from "react-redux";

class FirstPage extends Component {

    constructor(props){
        super(props);
        this.state ={
            redirectToSetting: false,
        };
        this.handleSetting = this.handleSetting.bind(this);
    }

    handleSetting = () => {
        this.setState({
            redirectToSetting: true,
        })
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
                        <Dropdown text={this.props.email}  floating labeled button icon='user' className='privateAccount'>
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
    };
};

export default connect(mapStateToProps, null)(FirstPage);
