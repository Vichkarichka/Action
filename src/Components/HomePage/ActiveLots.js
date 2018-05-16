import React from 'react'
import {connect} from "react-redux";
import axios from "axios/index";
import { saveAllDataLots } from "../../Redux/Reducer";
import { Link } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';
import './ActiveLots.css';
import CountDown from '../CountDown';
import moment from 'moment';

class ActiveLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.requestToServer();
    }

    requestToServer = () => {
        axios.get('http://127.0.0.1:8200/allLots')
            .then(res => {
               this.props.saveAllDataLots(res.data);
            }).catch(function (error) {
            console.log(error);
        });
    };

    render() {

        if(!this.props.lots) return null;

        let urlImage = this.props.lots.result;
        let urlImages = urlImage.map((urlItem) =>
            <Item key = {urlItem.idLot} >
                <Item.Image size= "small" src={'http://localhost:8200/'+ urlItem.img[0].imagesLotUrl } />

                <Item.Content  key = {urlItem.idLot} >
                    <Link to={`/lotsUser/${urlItem.idLot}`}>
                        <Item.Header   key = {urlItem.idLot}>
                        {urlItem.nameLot}
                    </Item.Header>
                    </Link>
                    <Item.Meta>
                        <span>{urlItem.priceLot + '$'}</span>
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
                <Item.Group divided link className = "AllLots">

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

const mapDispatchToProps = (dispatch) => {
    return {
        saveAllDataLots: (lots) => dispatch(saveAllDataLots(lots)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveLots);