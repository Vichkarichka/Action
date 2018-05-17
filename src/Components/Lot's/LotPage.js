import React, {Component} from 'react';
import { connect } from "react-redux";
import HatWrapper from '../Header/HatWrapper';
import { Item, Label, Button, Container } from 'semantic-ui-react';
import './LotPage.css';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import moment from "moment/moment";
import { bidValue } from "../../Redux/Reducer";
import BidLots from './BidLots';
import CountDown from '../CountDown';

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

    checkTime = (value) =>
        (moment(value).format('DD.MM.YYYY, LTS') <= new Date(Date.now()).toLocaleString('ru'));


    render() {
        if(!this.props.lots) return null;
        let urlImage = this.props.lots.result;
        let lotData = urlImage.filter(lot => lot.idLot === parseInt(this.state.lotId));
        let urlImages = lotData.map((urlItem) =>
            <Item key = {urlItem.idLot}  >
                <Carousel className = 'Carousel'>
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
                        ((!this.props.data) &&
                            <Item.Description>
                                <strong>{"Please register to make a bet."}</strong>
                            </Item.Description>)
                        || ((urlItem.nameUser === this.props.data.email) &&
                            <Button className='buttonEditLot' disabled ={this.checkTime(urlItem.startTime)}>EDIT</Button>) ||
                        <BidLots value = {lotData} />
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