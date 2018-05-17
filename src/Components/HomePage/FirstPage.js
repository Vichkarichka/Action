import React, {Component} from 'react';
import './FirstPage.css';
import { connect } from "react-redux";
import HatWrapper from '../Header/HatWrapper';
import ActiveLots from './ActiveLots';

class FirstPage extends Component {

    constructor(props){
        super(props);
        this.state ={

        };
    }

    render() {
        return (
            <div>
                <HatWrapper/>
                <ActiveLots/>
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
