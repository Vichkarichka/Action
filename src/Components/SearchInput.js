import React, { Component } from 'react'
import { Search, Grid, Item } from 'semantic-ui-react'
import {connect} from "react-redux";

class SearchInput extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            value: '',
            results: [],
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.resultRenderer = this.resultRenderer.bind(this);
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            const re = new RegExp(this.state.value, 'i');
            const isMatch = result => re.test(result.nameLot);

            const results = this.props.lots.result.filter(isMatch).map(result => ({ ...result, key: result.idLot }));

            this.setState({
                isLoading: false,
                results: results,
            });
        }, 500)
    };

    handleResultSelect = (e, data) => {
        console.log(data.result.idLot);
    };


    resultRenderer({ idLot, nameLot, priceLot, img }) {
        return <div id={idLot} key={idLot}>
            <Item.Group >
                <Item.Image size= "tiny" src={'http://localhost:8200/'+ ((img && img[0].imagesLotUrl) || 'ImageLot/empty.png' )  } />
                <Item.Header >
                    {nameLot}
                </Item.Header>
                <Item.Meta>
                    <span>{priceLot + '$'}</span>
                </Item.Meta>
            </Item.Group>
            </div>
    }

    render() {
        const { isLoading, value, results } = this.state;
        return (
                        <Search
                            loading={isLoading}
                            resultRenderer={this.resultRenderer}
                            onSearchChange={this.handleSearchChange}
                            onResultSelect={this.handleResultSelect}
                            results={results}
                            value={value}
                        />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        lots: state.lots,
    };
};


export default connect(mapStateToProps, null)(SearchInput);
