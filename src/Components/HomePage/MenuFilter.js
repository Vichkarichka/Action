import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import './MenuFilter.css';

export default class MenuFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillReceiveProps(nextProps) {
       if (this.props !== nextProps && nextProps.dataLot) {
            this.setState({lot: nextProps.dataLot});
        }
    }

    compareLot = (items) => {
        let sortOrder = 1;
        if(items[0] === "-") {
            sortOrder = -1;
            items = items.substr(1);
        }
        return  (a,b) => {
            console.log(items);

            let result = (a[items] < b[items]) ? -1 : (a[items] > b[items]) ? 1 : 0;

            return result * sortOrder;
        }
    };

    handleItemClick = (e, { name }) => {
    let lot =  this.state.lot;
        switch (name) {

            case 'by Name': lot.sort(this.compareLot('nameLot'));
                this.props.sortData(lot);
                break;

            case 'by Sections': lot.sort(this.compareLot('categoryLot'));
                this.props.sortData(lot);
                break;

            case 'by Price': lot.sort(this.compareLot('priceLot'));
                this.props.sortData(lot);
                break;

            case 'by StartTime': lot.sort(this.compareLot('startTime'));
                this.props.sortData(lot);
                break;

            case 'by EndTime': lot.sort(this.compareLot('endTime'));
                this.props.sortData(lot);
                break;
        }

        this.setState({
            activeItem: name,
        })
    };

    render() {
        const { activeItem } = this.state;
        console.log(this.state.lot);
        return (
            <Container >
            <Menu className='Filter' pointing secondary>
                <Menu.Item header>Filter</Menu.Item>
                <Menu.Item name='by Name' active={activeItem === 'by Name'} onClick={this.handleItemClick} />
                <Menu.Item name='by Sections' active={activeItem === 'by Sections'} onClick={this.handleItemClick} />
                <Menu.Item name='by Price' active={activeItem === 'by Price'} onClick={this.handleItemClick} />
                <Menu.Item name='by StartTime' active={activeItem === 'by StartTime'} onClick={this.handleItemClick} />
                <Menu.Item name='by EndTime' active={activeItem === 'by EndTime'} onClick={this.handleItemClick} />
            </Menu>
            </Container>
        )
    }
}
