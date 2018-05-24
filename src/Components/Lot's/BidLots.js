import React, { Component } from 'react';
import { Button, Input, Statistic, Icon, Divider } from 'semantic-ui-react';
import { connect } from "react-redux";
import socketIOClient from 'socket.io-client';

class BidLots extends Component {

    constructor(props){
        super(props);
        this.state ={
            currentValue: this.props.value[0].newBid,
            bidValue: 0,
            countBid: this.props.value[0].countBidLot,

        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    sendData = (bidValues) => {
        this.state.socket.emit('bidValue', bidValues);
    };

     componentWillMount() {
         this.initSocket();
     };

     componentWillUnmount() {
         this.state.socket.close();
     };

     initSocket = () => {
         const socket = socketIOClient("http://localhost:8200");
         socket.on('connect', () => {
             socket.emit('room', this.props.value[0].idLot);
         });

         socket.on('bidValue', (value) => {
             this.setState({currentValue: value.bid, countBid: value.countBid});
         });

         this.setState({socket});
     };


    handleChange = (e) => {
        this.setState({ bidValue:( parseInt(e.target.value) )});
    };

    handleClick = () => {
        if(this.state.bidValue <= this.state.currentValue) return null;

        const bidValues = {
            bid: this.state.bidValue,
            idLot: this.props.value[0].idLot,
            buyer: this.props.data.idUsers,
            countBid: this.state.countBid + 1,
        };
        this.sendData(bidValues);
    };

    render() {
        return (
            <div>
                <Statistic>
                    <Statistic.Value>
                        {parseInt(this.state.currentValue)}
                        <Icon name='dollar' />
                        {'(' + this.state.countBid + 'bid)'}
                    </Statistic.Value>
                </Statistic>
                <Divider horizontal>Make your bid</Divider>
                <Input className='bid' type='number' placeholder='Type your max bid' onChange={ this.handleChange } action >
                    <input />
                    <Button type='submit' onClick={this.handleClick}>BID</Button>
                </Input>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
    };
};

export default connect(mapStateToProps, null)(BidLots);