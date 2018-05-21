import React from 'react'
import HatWrapper from '../Header/HatWrapper';
import { Form, Image, Button, TextArea, Segment, Icon } from 'semantic-ui-react';
import {connect} from "react-redux";
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../../Redux/Reducer";
import Demo from "../DataTimePicker/Demo";
import "./NewLots.css";
import moment from 'moment';

class EditLot extends React.Component {
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
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => {
            this.validateField(name, value);
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
    }

    validInput() {
        this.setState({formValid: this.state.nameError && this.state.priceError && this.state.selectError});
    }

    handleFileChange = ( e ) => {
        console.log(e.target.files);
        this.setState( {files: e.target.files}, () =>{

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
    }

    handleFormSubmit(e) {

        e.preventDefault();
        let nameLot = this.state.namelot;
        let priceLot = this.state.price;
        if(nameLot.length === 0 && priceLot.length === 0 && !this.state.formValid) {
            this.setState({
                nameError: false,
                priceError: false ,
                selectError: false,
                formValid: false,
            });
        } else {
            this.setState({
                formValid: true,
            }, this.requestServer);
        }
    };

    requestServer = () => {

        let dataLot = {
            nameLot: this.state.namelot,
            price: this.state.price,
            textField: this.state.textField,
            value: this.state.value,
            startTime: moment(this.state.startTime).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(this.state.endTime).format('YYYY-MM-DD HH:mm:ss'),
            idUsers: this.props.data.idUsers,
        };

        const formData = new FormData();
        for( let i = 0; i <= this.state.files.length; i++)
        {
            formData.append( "file", this.state.files[i]);
        }
        formData.append( "lotData" , JSON.stringify(dataLot));
        console.log(this.state.lotId);
        axios.post('http://127.0.0.1:8200/editLots/' + this.state.lotId, formData)
            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleData = (data) => {
        this.setState({
            startTime: data.startData,
            endTime: data.endData,
        });
    };

    change = (event) => {
        this.setState({value: event.target.value});
    };

    componentWillMount() {

        this.setState({
            lotId: this.props.match.params.lotId,
    },()=>{
            let lotData = this.props.lots.result.filter(lot => lot.idLot === parseInt(this.state.lotId));
            console.log(lotData[0]);
            this.setState({
               namelot: lotData[0].nameLot,
               price: lotData[0].priceLot,
                textField: lotData[0].descriptionLot,
                value: lotData[0].idCategoryLot,
                startTime: moment(lotData[0].startTime),
                endTime: moment(lotData[0].endTime),
                url: lotData[0].img,
            });
        })};




    render() {

        let category = this.props.category;
        let optionItems = category.map((categoryItem) =>
            <option  key={categoryItem.idCategoryLot} value={categoryItem.idCategoryLot}>{categoryItem.nameCategory}</option>
        );

        let urlImage = this.state.url;
        let urlImages = urlImage.map((urlItem) =>
            <Image  src = {urlItem.imagesLotUrl && ('http://localhost:8200/'+ urlItem.imagesLotUrl) || urlItem } size='medium' bordered className ='imgUrl' />
        );

        let { namelot, price, textField } = this.state;

        return (
            <div>
                <div>
                    <HatWrapper/>
                </div>
                <h1 className='editLot'>Edit lot</h1>
                {urlImages}
                <Form className = 'formNewLot' onSubmit={this.handleFormSubmit}>
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
                    <Button className='buttonCreateLot' basic>Create Lot</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        category: state.category,
        lots: state.lots,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginValue: (data) => dispatch(loginValue(data)),
        saveUserAvatar: (urlImage) => dispatch(saveUserAvatar(urlImage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLot);