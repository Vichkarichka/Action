import React, {Component} from 'react';
import { connect } from "react-redux";
import HatWrapper from '../Header/HatWrapper';
import { Item, Input, Button, Statistic, Icon } from 'semantic-ui-react';
import './LotPage.css';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import moment from "moment/moment";

class LotPage extends Component {

    constructor(props){
        super(props);
        this.state ={
            lotId: '',
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount () {
        this.setState ({
           lotId: this.props.match.params.userId,
        });
    }

    handleClick = () => {
        console.log("Click");
    };


    render() {

        if(!this.props.lots) return null;

        let urlImage = this.props.lots.result;
        let lotData = urlImage.filter(lot => lot.idLot === parseInt(this.state.lotId));
        let urlImages = lotData.map((urlItem) =>
            <Item key = {urlItem.idLot}  >
                <Carousel className = 'Carousel'>
                    {
                        urlItem.img.map((img) =>
                            <div>
                                <img src={'http://localhost:8200/'+ img.imagesLotUrl} />
                            </div>
                        )
                    }
                </Carousel>
                <Item.Content  key = {urlItem.idLot} >
                    <Item.Header   key = {urlItem.idLot} className='NameLot'>
                        {urlItem.nameLot}
                    </Item.Header>
                    <Item.Meta>
                        <span>{ 'STARTING BID:' + urlItem.priceLot + '$'}</span>
                    </Item.Meta>
                    <Statistic>
                        <Statistic.Value>
                            {urlItem.priceLot}
                            <Icon name='dollar' />
                            {'(0 bid)'}
                        </Statistic.Value>
                    </Statistic>
                    <Input className='bid' type='number' placeholder='Type your max bid' action>
                        <input />
                        <Button type='submit' onClick={this.handleClick}>BID</Button>
                    </Input>
                    <Item.Description>{urlItem.descriptionLot}</Item.Description>
                </Item.Content>
            </Item>
        );
        return (
            <div>
                <HatWrapper/>
                <Item.Group className = "Lot">
                    {urlImages}
                </Item.Group>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        lots: state.lots,
    };
};

export default connect(mapStateToProps, null)(LotPage);