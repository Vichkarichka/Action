import React from 'react'
import HatWrapper from '../Header/HatWrapper';
import {connect} from "react-redux";
import axios from "axios/index";
import { Item } from 'semantic-ui-react'
import { renderLot } from '../Function';
import './UserLots.css';
import PaginationComponent from '../Pagination';

class UserLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 4
        };
    }

    handleValue = (value) => {
        this.setState({
            start: value.start,
            end: value.end
        });
    };

    render() {
        if(!this.props.lots) return null;
        let lot = this.props.lots.result;
        let lotUser = lot.filter(lot => lot.nameUser === this.props.data.email)
        let pagination = lotUser.slice(this.state.start, this.state.end);
        let displayLot = renderLot(pagination);
        return (
            <div>
                <div>
                    <HatWrapper/>
                </div>
                <Item.Group divided className = 'UserLots'>
                    <Item.Header className = 'HeaderUserLots'>
                        {"MY LOT'S"}
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


export default connect(mapStateToProps, null)(UserLots);

