import React, {Component} from 'react';
import ModalForm from './ModalForm';
import Header from './Header';
import { Container } from 'semantic-ui-react';

export default class HatWrapper extends Component {
    render() {
        return (
            <div>
                <Container >
                <ModalForm/>
                <Header/>
                </Container>
            </div>
        )
    }
}