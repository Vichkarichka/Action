import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getValueCategory } from "../../Redux/Reducer";
import { getSections } from '../Function';
import { Redirect, withRouter } from 'react-router-dom';

class Sections extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirect: false,
        };
    }

    componentDidUpdate () {
        if (this.state.redirect) {
            this.setState({
                redirect: false
            })
        }
    }

    componentDidMount() {
        getSections().then((initialCategory) => {
            this.props.getValueCategory(initialCategory);
        });
    };

    handleClick = (e, data) => {
        if(data.value) this.setState({redirect: true, idSections: data.value});
    };


    render() {
        if(!this.props.category) return null;
        if (this.state.redirect) {
            return (
                <Redirect push to = {'/sections/' + this.state.idSections}/>
            )
        }
        let category = this.props.category;
        return (
                <Dropdown onChange={this.handleClick} className='sections' text='SECTIONS' options={category.map(categoryItem => ({
                    key: categoryItem.idCategoryLot,
                    value: categoryItem.idCategoryLot,
                    text: categoryItem.nameCategory,
                }))} />

        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getValueCategory: (category) => dispatch(getValueCategory(category)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sections));