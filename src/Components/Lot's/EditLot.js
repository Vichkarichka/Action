import React from 'react'
import HatWrapper from '../Header/HatWrapper';
import { Button, Message } from 'semantic-ui-react';
import {connect} from "react-redux";
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../../Redux/Reducer";
import "./NewLots.css";
import moment from 'moment';
import LotForm from '../LotForm';

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
        });
    };

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
                    success: true,
                });
                setTimeout(()=>self.setState({success: false}), 3000);
            })
            .catch(function (error) {
                self.setState({
                    success: false,
                });
            });
    };

    render() {
        return (
            <div>
                <div>
                    <HatWrapper/>
                </div>
                <h1 className='editLot'>Edit lot</h1>
                <LotForm onInputValue={this.handleInput} dataLot = {this.props.lots} lotId={this.props.match.params.lotId}/>
                    <Button className='buttonCreateLot' basic onClick={this.handleFormSubmit}>Create Lot</Button>
                {
                    this.state.success &&
                    <Message
                        success
                        header='Your lot added successful'
                        content='You may now watch in My Lots'
                    />
                }
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