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
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <Item.Group divided>
                    <Item>
                        <Item.Image src='/assets/images/wireframe/image.png' />

                        <Item.Content>
                            <Item.Header as='a'>12 Years a Slave</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>Union Square 14</span>
                            </Item.Meta>
                            <Item.Description>{paragraph}</Item.Description>
                            <Item.Extra>
                                <Label>IMAX</Label>
                                <Label icon='globe' content='Additional Languages' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Image src='/assets/images/wireframe/image.png' />

                        <Item.Content>
                            <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>IFC Cinema</span>
                            </Item.Meta>
                            <Item.Description>{paragraph}</Item.Description>
                            <Item.Extra>
                                <Button primary floated='right'>
                                    Buy tickets
                                    <Icon name='right chevron' />
                                </Button>
                                <Label>Limited</Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item>
                        <Item.Image src='/assets/images/wireframe/image.png' />

                        <Item.Content>
                            <Item.Header as='a'>Watchmen</Item.Header>
                            <Item.Meta>
                                <span className='cinema'>IFC</span>
                            </Item.Meta>
                            <Item.Description>{paragraph}</Item.Description>
                            <Item.Extra>
                                <Button primary floated='right'>
                                    Buy tickets
                                    <Icon name='right chevron' />
                                </Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
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