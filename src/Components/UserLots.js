import React from 'react'
import Header from './Header';
import {connect} from "react-redux";
import axios from "axios/index";
import { saveDataLot } from "../Redux/Reducer";
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react'

class UserLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.requestToServer();
    }

    requestToServer = () => {
        let idUsers = this.props.data.idUsers;
        axios.get('http://127.0.0.1:8200/userLots/' + idUsers)
            .then(res => {
                this.props.saveDataLot(res.data);
            }).catch(function (error) {
            console.log(error);
        });
    };

    render() {

        if(!this.props.lot) return null;
        const paragraph = "gskgsgshshhdhdfhd";
        console.log(this.props.lot);

        let urlImage = this.props.lot.result;
        let urlImages = urlImage.map((urlItem) =>
            <Item key = {urlItem.idLot}>
                <Item.Image src={'http://localhost:8200/'+ urlItem.img[0].imagesLotUrl } />

                <Item.Content key = {urlItem.idLot}>
                    <Item.Header as='a' key = {urlItem.idLot}>{urlItem.nameLot}</Item.Header>
                    <Item.Meta>
                        <span  key = {urlItem.idLot}>{urlItem.priceLot + '$'}</span>
                    </Item.Meta>
                    <Item.Description>{urlItem.descriptionLot}</Item.Description>
                    <Item.Extra>
                        <Label>{urlItem.categoryLot}</Label>
                    </Item.Extra>
                    <Button key = {urlItem.idLot} primary floated='right' basic>
                        Edit
                    </Button>
                </Item.Content>
            </Item>
        );
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <Item.Group divided>

                            {urlImages}

                </Item.Group>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        lot: state.lot,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataLot: (lot) => dispatch(saveDataLot(lot)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLots);

