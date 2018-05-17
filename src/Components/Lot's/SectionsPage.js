import React, {Component} from 'react';
import { connect } from "react-redux";
import HatWrapper from '../Header/HatWrapper';
import { Item, Container } from 'semantic-ui-react';
import { bidValue } from "../../Redux/Reducer";
import { renderLot } from "../Function";

class SectionsPage extends Component {

    constructor(props){
        super(props);
        this.state ={

        };
    }

    render() {
       let sectionsId = this.props.match.params.sectionId;
        if(!this.props.lots) return null;
        let lot = this.props.lots.result;
        let lotData = lot.filter(lot => lot.idCategoryLot === parseInt(sectionsId));
        let displayLot = renderLot(lotData);
        return (
            <div>
                <HatWrapper/>
                <Container>
                    <Item.Group className = "Lot">
                        {displayLot}
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