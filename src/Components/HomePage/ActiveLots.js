import React from 'react'
import {connect} from "react-redux";
import axios from "axios/index";
import { saveAllDataLots } from "../../Redux/Reducer";
import { Item } from 'semantic-ui-react';
import './ActiveLots.css';
import PaginationComponent from '../Pagination';
import { renderLot } from '../Function';

class ActiveLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 4
        };
    }

    componentWillMount() {
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

    handleValue = (value) => {
        this.setState({
            start: value.start,
            end: value.end
        });
    };



    render() {
        if(!this.props.lots) return null;
        let lot = this.props.lots.result.slice(this.state.start, this.state.end);
        let displayLot = renderLot(lot);
        return (
            <div>
                <Item.Group divided link className = "AllLots">

                {displayLot}

                </Item.Group>
                <PaginationComponent onSetStartEndValue={this.handleValue}/>
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