import React from 'react'
import {connect} from "react-redux";
import axios from "axios/index";
import { saveAllDataLots } from "../../Redux/Reducer";
import { Item } from 'semantic-ui-react';
import './ActiveLots.css';
import PaginationComponent from '../Pagination';
import { renderLot } from '../Function';
import MenuFilter from './MenuFilter';

class ActiveLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 4,
            sortData: [],
        };
    }

    componentWillMount() {
        this.requestToServer();
    }

    requestToServer = () => {
        axios.get('http://127.0.0.1:8200/allLots')
            .then(res => {
               this.props.saveAllDataLots(res.data);
            }).catch((error) => {
            console.log(error);
        });
    };

    handleValue = (value) => {
        this.setState({
            start: value.start,
            end: value.end
        });
    };

    setSortData = (value) => {this.setState({ sortData: value});};

    render() {
        if(!this.props.lots) return null;

        let lotData;
        if(this.state.sortData.length === 0) {
            lotData = this.props.lots.result;
        } else {
            lotData = this.state.sortData;
        }

        let lot = lotData.slice(this.state.start, this.state.end);
        let displayLot = renderLot(lot);
        return (
            <div style={{marginTop: 5}}>
                <MenuFilter dataLot = {this.props.lots.result} sortData = {this.setSortData}/>
                <Item.Group divided link className = "AllLots">

                {displayLot}

                </Item.Group>
                <PaginationComponent onSetStartEndValue={this.handleValue} lotLength = {this.props.lots.result.length}/>
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