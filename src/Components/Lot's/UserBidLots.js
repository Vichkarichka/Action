import React from 'react'
import HatWrapper from '../Header/HatWrapper';
import {connect} from "react-redux";
import axios from "axios/index";
import { Item } from 'semantic-ui-react'
import {getSections, renderLot} from '../Function';
import './UserLots.css';
import PaginationComponent from '../Pagination';

class UserBidLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 4,
            bidUserLot: [],
        };
    }

    handleValue = (value) => {
        this.setState({
            start: value.start,
            end: value.end
        });
    };

    componentWillMount() {
        axios.get('http://127.0.0.1:8200/bid/' + this.props.match.params.userId)
            .then(response => {
               this.setState({
                   bidIdLot: response.data.Bid[0].idLot,
                   valueBid: response.data.Bid[0].bidValue,
               });
            }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        if(!this.props.lots) return null;
        let lot = this.props.lots.result;
        let lotUser = lot.filter(lot => lot.idLot === this.state.bidIdLot);
        let pagination = lotUser.slice(this.state.start, this.state.end);
        let displayLot = renderLot(pagination, this.state.valueBid);
        return (
            <div>
                <div>
                    <HatWrapper/>
                </div>
                <Item.Group divided className = 'UserLots'>
                    <Item.Header className = 'HeaderUserLots'>
                        {"Your bid"}
                    </Item.Header>

                    {displayLot}

                </Item.Group>
                {
                    lotUser.length >= this.state.end &&
                    <PaginationComponent onSetStartEndValue={this.handleValue} lotLength = {lotUser.length}/>
                }
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


export default connect(mapStateToProps, null)(UserBidLots);