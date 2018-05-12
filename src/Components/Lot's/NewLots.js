import React from 'react'
import Header from '../Header';
import { Form, Image, Button, TextArea } from 'semantic-ui-react';
import {connect} from "react-redux";
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../../Redux/Reducer";
import Demo from "../DataTimePicker/Demo";
import "./NewLots.css";
import moment from 'moment';

class NewLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            namelot: '',
            price: '',
            textField: '',
            planets: [],
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
        console.log(nameLot.length === 0 && priceLot.length === 0 && !this.state.formValid);
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
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          idUsers: this.props.data.idUsers,
        };

        const formData = new FormData();
        for( let i = 0; i <= this.state.files.length; i++)
        {
            formData.append( "file", this.state.files[i]);
        }
        formData.append( "lotData" , JSON.stringify(dataLot));
        axios.post('http://127.0.0.1:8200/newlots', formData)
            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleData = (data) => {
        data.startData = moment(data.startData).format('YYYY-MM-DD HH:mm:ss');
        data.endData = moment(data.endData).format('YYYY-MM-DD HH:mm:ss');
        this.setState({
            startTime: data.startData,
            endTime: data.endData,
        });
    };

    change = (event) => {
        this.setState({value: event.target.value});
    };

    componentDidMount() {
        let initialPlanets = [];
        axios.get('http://127.0.0.1:8200/newLots')
            .then(response => {
            initialPlanets = response.data.result.map((planet) => {
                return planet;
            });
            this.setState({
                planets: initialPlanets,
            });
            }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let category = this.state.planets;
        let optionItems = category.map((categoryItem) =>
            <option  key={categoryItem.idCategoryLot} value={categoryItem.idCategoryLot}>{categoryItem.nameCategory}</option>
        );
        let urlImage = this.state.url;
        let urlImages = urlImage.map((urlItem) =>
            <Image src = {urlItem} size='medium' bordered className ='imgUrl' />
        );
        let {namelot, price, textField} = this.state;
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <h1>Create new lot</h1>
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
                    <Demo onSetData={this.handleData}/>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginValue: (data) => dispatch(loginValue(data)),
        saveUserAvatar: (urlImage) => dispatch(saveUserAvatar(urlImage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLots);