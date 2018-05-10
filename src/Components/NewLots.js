import React from 'react'
import Header from './Header';
import { Form, Image, Button, Select, TextArea } from 'semantic-ui-react';
import {connect} from "react-redux";
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../Redux/Reducer";
import Demo from "./Demo";
import emptyUser from '../Style/empty-avatar.jpg';
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
            url: emptyUser,
            nameError: true,
            priceError: true,
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

        switch(fieldName) {

            case 'namelot':
                reg = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
                nameError = reg.test(value);
                break;
            case 'price':
                reg = /^\d{1,8}(?:\.\d{1,4})?$/;
                priceError = reg.test(value);
                break;
            default:
                break;
        }
        this.setState({
            nameError: nameError,
            priceError: priceError ,
        },this.validInput);
    }

    validInput() {
        this.setState({formValid: this.state.nameError && this.state.priceError});
    }

    handleFileChange = ( e ) => {
        this.setState( {file: e.target.files[0]}, () =>{
            let reader = new FileReader();
            reader.onload = () =>{
                this.setState({
                    url: reader.result,
                })
            };
            if(this.state.file){
                reader.readAsDataURL(this.state.file);
            }
        });
    };

    handleFormSubmit(e) {
        e.preventDefault();
        let nameLot = this.state.namelot;
        let priceLot = this.state.price;
        if(nameLot.length === 0 && priceLot.length === 0) {
            this.setState({
                formValid: false,
            });
        } else {
            this.setState({
                formValid: true,
            }, this.requestServer);
        }
    };

    requestServer = () => {
        let self = this;

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
        formData.append( "file", this.state.file);
        formData.append( "lotData" , JSON.stringify(dataLot));
        console.log(this.state);
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
                return planet
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
        let {namelot, price, textField} = this.state;
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <Form className = 'formNewLot' onSubmit={this.handleFormSubmit}>
                    <h1>Create new lot</h1>
                    <Form.Field>
                        <Image src = {this.state.url} size='medium' bordered />
                        <input
                            type="file"
                            id="imgLot"
                            onChange={this.handleFileChange}
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
                    <select placeholder='Select category' onChange={this.change} value={this.state.value}>
                        <option>Selsect category</option>
                        {optionItems}
                    </select>
                    </Form.Field>
                    <Form.Field>
                    <TextArea autoHeight placeholder='Add desription about lot' onChange={this.handleInput} name = 'textField' value = {textField} />
                </Form.Field>
                    <Button className='buttonUploadh' basic>Create Lot</Button>
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