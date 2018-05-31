import React, { Component } from 'react';
import { Button, Input, Statistic, Icon, Divider, Table, Header } from 'semantic-ui-react';
import { connect } from "react-redux";
import socketIOClient from 'socket.io-client';
import axios from "axios/index";
import moment from "moment/moment";
import './BidLots.css';

class BidLots extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentValue: this.props.value[0].newBid,
            bidValue: 0,
            countBid: this.props.value[0].countBidLot,
            bidHistoryLot: [],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    sendData = (bidValues) => {
        this.state.socket.emit('bidValue', bidValues);
        this.requestServer();
    };

    requestServer = () => {

        let dataBid = {
            bid: this.state.bidValue,
            buyer: this.props.data.idUsers,
        };

        axios.post('http://127.0.0.1:8200/bid/' + this.props.value[0].idLot, dataBid)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

     componentWillMount() {
         this.initSocket();
         /*axios.get('http://127.0.0.1:8200/bid')
             .then(response => {
                 this.setState({
                     bidHistoryLot: response.data.Bid,
                 });
             }).catch((error) => {
             console.log(error);
         });*/
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

         socket.on('bidHistory', (value) => {
             console.log(value);
             this.setState({
                 bidHistoryLot: value
             })
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

    renderHistory = () => {
        let historyBid = this.state.bidHistoryLot;
        let isHistory = historyBid.filter(historyBid => historyBid.idLot === this.props.value[0].idLot);
        if( isHistory.length === 0) {
            return  <strong>{"Bids history is empty"}</strong>
        } else {
            let bid =
                <Table basic='very' celled collapsing className='TableHistory'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>User Name</Table.HeaderCell>
                            <Table.HeaderCell>Value Bid</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {  historyBid.map((bidItem) =>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header>
                                    <Header.Content>
                                        {bidItem.idBuyer}
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>
                                {bidItem.bidValue + " $"}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    )}
                </Table>;
            return bid;
        }
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
                <Divider horizontal>History bid</Divider>
                {
                    this.renderHistory()
                }
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