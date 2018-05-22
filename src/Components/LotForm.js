import React from 'react'
import { Form, Image, TextArea,} from 'semantic-ui-react';
import {connect} from "react-redux";
import {saveUserAvatar, loginValue} from "../Redux/Reducer";
import Demo from "./DataTimePicker/Demo";
import moment from 'moment';
import './LotForm.css';

class LotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            namelot: '',
            price: '',
            textField: '',
            category: [],
            value: 'select',
            url: [],
            nameError: true,
            priceError: true,
            selectError: true,
            files: [],
        };
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => {
            this.validateField(name, value);
            this.props.onInputValue(this.state);
        })
    };

    validateField(fieldName, value) {
        let nameError = this.state.nameError;
        let priceError = this.state.priceError;
        let reg;
        let selectError = this.state.value;

        switch(fieldName) {

            case 'namelot':
                reg = /^([a-zA-Z0-9 .,_-]+)$/;
                nameError = reg.test(value);
                break;
            case 'price':
                reg = /^\d{1,8}(?:\.\d{1,4})?$/;
                priceError = reg.test(value);
                break;
            default:
                break;
        }
        if (selectError === 'Select category')
        {
            selectError = false;
        }
        this.setState({
            nameError: nameError,
            priceError: priceError ,
            selectError: selectError,
        },this.validInput);
    };

    validInput() {
        this.setState({formValid: this.state.nameError && this.state.priceError && this.state.selectError});
    };

    componentWillMount() {
        if(this.props.dataLot) {
            this.setState({
                lotId: this.props.lotId,
            },()=>{
                let lotData = this.props.dataLot.result.filter(lot => lot.idLot === parseInt(this.state.lotId));
                this.setState({
                    namelot: lotData[0].nameLot,
                    price: lotData[0].priceLot,
                    textField: lotData[0].descriptionLot,
                    value: lotData[0].idCategoryLot,
                    startTime: moment(lotData[0].startTime),
                    endTime: moment(lotData[0].endTime),
                    url: lotData[0].img,
                });
            })
        }
    };

    handleFileChange = ( e ) => {
        this.setState( {files: e.target.files , url: []}, () =>{

            for (let i = 0; i < this.state.files.length; i++) {
                this.setupReader(this.state.files[i]);
            }
        });
    };

    setupReader(files) {
        let reader = new FileReader();
        reader.onload = () => {
            let url = this.state.url;
            url.push(reader.result);
            this.setState({
                url: url,
            });
        };
        reader.readAsDataURL(files);
    };

    handleData = (data) => {
        this.setState({
            startTime: data.startData,
            endTime: data.endData,
        },() => {
            this.props.onInputValue(this.state);
        });
    };

    change = (event) => {
        this.setState({value: event.target.value});
    };

    render() {
        let category = this.props.category;
        let optionItems = category.map((categoryItem) =>
            <option  key={categoryItem.idCategoryLot} value={categoryItem.idCategoryLot}>{categoryItem.nameCategory}</option>
        );
        let urlImage = this.state.url;
        let urlImages = urlImage.map((urlItem) =>
            <Image className= 'displayImg' src = {urlItem.imagesLotUrl && ('http://localhost:8200/'+ urlItem.imagesLotUrl) || urlItem }/>
        );
        let { namelot, price, textField } = this.state;
        return (
            <div>
                {urlImages}
                <Form className = 'formNewLot'>
                    <Form.Field>
                        <input
                            type="file"
                            id="imgLot"
                            onChange={this.handleFileChange}
                            multiple
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input placeholder='Name lot' onChange={this.handleInput} error={!this.state.nameError} name = 'namelot' value = {namelot}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input type = 'number' min = {0} placeholder='Price' onChange={this.handleInput} error={!this.state.priceError} name = 'price' value = {price}/>
                    </Form.Field>
                    <Form.Field>
                        <Demo value = {[this.state.startTime, this.state.endTime]} onSetData={this.handleData}/>
                    </Form.Field>
                    <Form.Field>
                        <select onChange={this.change} value={this.state.value} >
                            <option>Select category</option>
                            {optionItems}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <TextArea autoHeight placeholder='Add desription about lot' onChange={this.handleInput} name = 'textField' value = {textField} />
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        category: state.category,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginValue: (data) => dispatch(loginValue(data)),
        saveUserAvatar: (urlImage) => dispatch(saveUserAvatar(urlImage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LotForm);