import React, { Component } from 'react'
import { Search, Grid, Item } from 'semantic-ui-react'
import {connect} from "react-redux";
import { Redirect, withRouter } from 'react-router-dom';

class SearchInput extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            value: '',
            results: [],
            redirect: false,
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

    componentDidUpdate () {
        if (this.state.redirect) {
            this.setState({
                redirect: false
            })
        }
    }

    handleResultSelect = (e, data) => {
        if(data.result.idLot) this.setState({redirect: true, idLot: data.result.idLot});
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
        console.log(this.state)
        const { isLoading, value, results } = this.state;
        if (this.state.redirect) {
            return (
                <Redirect push to = {'/lotsUser/' + this.state.idLot}/>
            )
        }
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


export default withRouter(connect(mapStateToProps, null)(SearchInput));
