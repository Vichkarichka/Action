import React, {Component} from 'react';
import { connect } from "react-redux";
import HatWrapper from '../Header/HatWrapper';
import { Item, Label, Container } from 'semantic-ui-react';
import moment from "moment/moment";
import { bidValue } from "../../Redux/Reducer";
import CountDown from '../CountDown';
import { Link } from 'react-router-dom';

class SectionsPage extends Component {

    constructor(props){
        super(props);
        this.state ={

        };
    }

    render() {
       let sectionsId = this.props.match.params.sectionId;
        if(!this.props.lots) return null;
        let urlImage = this.props.lots.result;
        let lotData = urlImage.filter(lot => lot.idCategoryLot === parseInt(sectionsId));
        let urlImages = lotData.map((urlItem) =>
            <Item key = {urlItem.idLot} >
                <Item.Image size= "small" src={'http://localhost:8200/'+ ((urlItem.img && urlItem.img[0].imagesLotUrl) || 'ImageLot/empty.png' )  } />

                <Item.Content  key = {urlItem.idLot} >
                    <Link to={`/lotsUser/${urlItem.idLot}`}>
                        <Item.Header   key = {urlItem.idLot}>
                            {urlItem.nameLot}
                        </Item.Header>
                    </Link>
                    <Item.Meta>
                        <span>{urlItem.newBid + '$'}</span>
                    </Item.Meta>
                    <Item.Description>{urlItem.descriptionLot}</Item.Description>
                    {
                        moment(urlItem.startTime).format('DD.MM.YYYY, LTS') <= new Date(Date.now()).toLocaleString('ru') &&
                        <CountDown date={urlItem.endTime}/>
                    }
                    <Item.Extra>
                        <Label>{urlItem.categoryLot}</Label>
                    </Item.Extra>
                    <Item.Extra content={urlItem.nameUser} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionsPage);