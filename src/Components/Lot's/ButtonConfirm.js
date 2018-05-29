import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'
import {connect} from "react-redux";
import axios from "axios/index";
import { Redirect } from 'react-router-dom';

class ButtonConfirm extends Component {
    constructor(props){
        super(props);
        this.state ={
           open: false,
           redirect: false,
        };
    }

    show = () => this.setState({ open: true });
    handleCancel = () => this.setState({ open: false });

    handleConfirm = () => {
            this.requestServer(this.props.lotId);
    };

    requestServer = (idLot) => {
        axios.delete('http://127.0.0.1:8200/editLots/', { data: { idLot: idLot } })
            .then((response) => {
                this.setState({ open: false, redirect: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        if (this.state.redirect) {
            return (
                <Redirect push to = '/'/>
            )
        }
        return (
            <div>
                <Button onClick={this.show} className='buttonDeleteLot' disabled = {this.props.display}>DELETE</Button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        lots: state.lots,
        bid: state.bid,
        countBid: state.countBid,
    };
};

export default connect(mapStateToProps, null)(ButtonConfirm);