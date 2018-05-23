import React, {Component} from 'react';
import { connect } from "react-redux";
import HatWrapper from '../Header/HatWrapper';
import { Item, Label, Button, Container, Divider  } from 'semantic-ui-react';
import './LotPage.css';
import { Carousel } from 'react-responsive-carousel';
import { NavLink } from 'react-router-dom';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { bidValue } from "../../Redux/Reducer";
import BidLots from './BidLots';
import CountDown from '../CountDown';
import ButtonConfirm from './ButtonConfirm';

class LotPage extends Component {

    constructor(props){
        super(props);
        this.state ={
            lotId: '',
        };
    }
    componentDidMount () {
        this.setState ({
           lotId: this.props.match.params.userId,
        });
    }

    checkTime = (value) => new Date(value) < new Date(Date.now());

    checkTimeStart = (value) => new Date(value) > new Date(Date.now());

    displayItem = (name, idLot, startTime, lotData, endTime) => {
        let display;
        if(!this.props.data) {
            display = <Item.Description>
                <strong>{"Please register to make a bet."}</strong>
            </Item.Description>
        } else if (name === this.props.data.email) {
            display = <div>
                <Divider />
                    <NavLink to={`/editLots/${idLot}`} className={this.checkTime(startTime) && 'disabled-link' || 'enable-link'}>
                        <Button className='buttonEditLot' disabled ={this.checkTime(startTime)}>
                            EDIT
                        </Button>
                    </NavLink>
                <Divider horizontal>Or</Divider>
                    <ButtonConfirm display ={this.checkTime(startTime)} lotId = {this.state.lotId}/>
                </div>
        } else if (this.checkTime(endTime)){
            display = <Item.Description>
                <strong>{"AUCTION IS OVER"}</strong>
            </Item.Description>
        } else if (this.checkTimeStart(startTime)) {
            display = <strong>{"AUCTION START " + Math.round((new Date(startTime) - new Date(Date.now()))*1.1574074074074074e-8) + " DAY"}</strong>
        } else {
            display = <BidLots value = {lotData} />
        }
        return display;
    };

    render() {
        if(!this.props.lots) return null;
        let urlImage = this.props.lots.result;
        let lotData = urlImage.filter(lot => lot.idLot === parseInt(this.state.lotId));
        let urlImages = lotData.map((urlItem) =>
            <Item key = {urlItem.idLot}  >
                <Carousel className = 'Carousel' dynamicHeight = 'true'>
                    {((urlItem.img &&
                        urlItem.img.map((img) =>
                            <div>
                                <img src={'http://localhost:8200/'+ img.imagesLotUrl} />
                            </div>
                        )) ||
                            <div>
                                <img src={'http://localhost:8200/ImageLot/empty.png'} />
                            </div>
                    )}
                </Carousel>
                <Item.Content key = {urlItem.idLot} >
                    <Item.Header key = {urlItem.idLot} className='NameLot'>
                        { urlItem.nameLot}
                    </Item.Header>
                    {
                        this.checkTime(urlItem.startTime) &&
                        <CountDown date={urlItem.endTime}/>
                    }
                    <Item.Meta>
                        <span>{ 'STARTING BID:' + urlItem.priceLot + '$'}</span>
                    </Item.Meta>
                    <Item.Description>{urlItem.descriptionLot}</Item.Description>
                    <Item.Extra>
                        <Label>{urlItem.categoryLot}</Label>
                    </Item.Extra>
                    {
                        this.displayItem(urlItem.nameUser, urlItem.idLot, urlItem.startTime, lotData, urlItem.endTime)
                    }
                </Item.Content>
            </Item>
        );
        return (
            <div>
                <HatWrapper/>
                <Container>
                    <Item.Group className = "Lot">
                        {urlImages}
                    </Item.Group>
                </Container>
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

const mapDispatchToProps = (dispatch) => {
    return {
        bidValue: (bid, countBid) => dispatch(bidValue(bid, countBid)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LotPage);