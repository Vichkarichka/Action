import React from 'react'
import HatWrapper from '../Header/HatWrapper';
import { Button, Message } from 'semantic-ui-react';
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../../Redux/Reducer";
import "./NewLots.css";
import moment from 'moment';
import LotForm from './LotForm';
import { ErrorMessage } from "../ErrorMessage";
import { ErrorObject } from "../ErrorObject";

class EditLot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            namelot: '',
            price: '',
            textField: '',
            category: [],
            value: 'select',
            files: [],
            Error: false,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInput = (values) => {
        this.setState({
            namelot: values.namelot,
            price: values.price,
            textField: values.textField,
            value: values.value,
            files: values.files,
            startTime: moment(values.startTime),
            endTime: moment(values.endTime),
            formValid: values.formValid,
            lotId: values.lotId,
            urlDb: values.urlDb,
        });
    };

    handleFormSubmit() {

        let nameLot = this.state.namelot;
        let priceLot = this.state.price;
        let masLength =  this.state.urlDb.length + this.state.files.length;

        if(!this.state.formValid) {
            this.setState({
                Error: true,
                errorName: ErrorObject.FORM_VALID,
            });
            setTimeout(()=>this.setState({Error: false}), 3000);
        } else if(masLength > 5) {
            this.setState({
                Error: true,
                errorName: ErrorObject.LIMIT_FILE,
            });
            setTimeout(()=>this.setState({Error: false}), 3000);
        } else if(nameLot.length === 0 || priceLot.length === 0) {
            this.setState({
                Error: true,
                errorName: ErrorObject.EMPTY_FIELD,
            });
            setTimeout(()=>this.setState({Error: false}), 3000);
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
        axios.post('http://127.0.0.1:8200/editLots/' + this.state.lotId, formData)
            .then(function (response) {
                self.setState({
                    redirect: true,
                });
            })
            .catch(function (error) {
                self.setState({
                    redirect: false,
                });
            });
    };

    render() {
        if (this.state.redirect) {
            return (
                <Redirect push to = '/'/>
            )
        }
        return (
            <div>
                <div>
                    <HatWrapper/>
                </div>
                <h1 className='editLot'>Edit lot</h1>
                <LotForm onInputValue={this.handleInput} dataLot = {this.props.lots} lotId={this.props.match.params.lotId}/>
                <div style={{position: 'relative'}} >
                <Button className='buttonCreateLot' basic onClick={this.handleFormSubmit}>Edit Lot</Button>
                {
                    this.state.Error &&
                    ErrorMessage(this.state.errorName)
                }
                </div>
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