import React, {Component} from 'react';
import './FirstPage.css';
import { connect } from "react-redux";
import socketIOClient from 'socket.io-client';
import HatWrapper from '../Header/HatWrapper';

class FirstPage extends Component {

    constructor(props){
        super(props);
        this.state ={

        };
    }

   /* send = () => {
        this.state.socket.emit('send', "Big");
    };

    componentWillMount() {
        this.initSocket();
    }

    componentWillUnmount() {
        this.state.socket.close();
    }

    initSocket = () => {
        const socket = socketIOClient("http://localhost:8200");
        socket.on('connect', () => {
            console.log('Connected');
        });

        socket.on('news', (data) => {
            this.setState({response: data});
        });

        this.setState({socket});
    };*/



    render() {
        return (
            <div>
                <HatWrapper/>
                {/*<p>{this.state.response}</p>
                <button onClick = {this.send}>Click</button>*/}
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
