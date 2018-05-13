import React, {Component} from 'react';
import ModalForm from './ModalForm';
import Header from './Header';

export default class HatWrapper extends Component {
    render() {
        return (
            <div>
                <ModalForm/>
                <Header/>
            </div>
        )
    }
}