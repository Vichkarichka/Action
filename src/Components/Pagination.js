import React from 'react'
import {connect} from "react-redux";


import { Item, Label, Pagination } from 'semantic-ui-react';

class PaginationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 4,

        };
    }

    onChange = (e, data) => {
        let startEnd = this.paginaterItem(this.props.lots.result.length, data.activePage);
        this.props.onSetStartEndValue(startEnd);

    };

    paginaterItem = (lengthMas, activePage) => {

        const totalPages =  Math.ceil(this.props.lots.result.length/this.state.size);
        if (activePage < 1 || activePage > totalPages) return null;
        const start = (activePage - 1) * this.state.size ;
        const end = Math.min(start + this.state.size - 1, lengthMas - 1) + 1;
        return {start, end};
    };

    render() {
        return (
                <Pagination
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    onPageChange={this.onChange}
                    totalPages={ Math.ceil(this.props.lots.result.length/this.state.size)}
                />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lots: state.lots,
    };
};


export default connect(mapStateToProps, null)(PaginationComponent);