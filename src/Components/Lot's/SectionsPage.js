import React, {Component} from 'react';
import { connect } from "react-redux";
import HatWrapper from '../Header/HatWrapper';
import { Item, Container, Divider } from 'semantic-ui-react';
import { bidValue } from "../../Redux/Reducer";
import { renderLot } from "../Function";
import PaginationComponent from '../Pagination';
import './SectionsPage.css';
import { ImageForSections } from '../ImageForSections';

class SectionsPage extends Component {

    constructor(props){
        super(props);
        this.state ={
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
       let sectionsId = this.props.match.params.sectionId;
        if(!this.props.lots) return null;
        let lot = this.props.lots.result;
        let lotData = lot.filter(lot => lot.idCategoryLot === parseInt(sectionsId))
                         .slice(this.state.start, this.state.end);
        let displayLot = renderLot(lotData);
        return (
            <div>
                <HatWrapper/>
                <Container>
                    {
                        ImageForSections(parseInt(sectionsId))
                    }
                    <Item.Group divided className = "LotSections">
                        {displayLot}
                    </Item.Group>
                        <PaginationComponent onSetStartEndValue={this.handleValue}/>
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
