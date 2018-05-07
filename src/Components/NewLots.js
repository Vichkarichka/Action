import React from 'react'
import Header from './Header';
import { Form, Image, Button, Select, TextArea } from 'semantic-ui-react';
import {connect} from "react-redux";
import axios from "axios/index";
import {saveUserAvatar, loginValue} from "../Redux/Reducer";
import Demo from "./Demo";

class NewLots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <Form className = 'formNewLot' onSubmit={this.handleFormSubmit}>
                    <h1>Create new lot</h1>
                    <Form.Field>
                        <Image  size='medium' bordered  />
                        <input
                            type="file"
                            id="imglot"
                            onChange={this.handleFileChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input placeholder='Name lot' onChange={this.handleInput}  name = 'namelot'/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input placeholder='Price' onChange={this.handleInput} name = 'price'/>
                    </Form.Field>
                    <Form.Field>
                    <Demo/>
                </Form.Field>
                    <Form.Field>
                    <Select placeholder='Select category' />
                    </Form.Field>
                    <Form.Field>
                    <TextArea autoHeight placeholder='Add desription about lot' />
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