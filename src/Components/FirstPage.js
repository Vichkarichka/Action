import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import ModalLoginInForm from './ModalLoginInForm';
import logo from '../Style/logo.jpeg';

const FirstPage = () => (
    <div>
        <ModalLoginInForm/>
        <Segment raised>
            <Image src= {logo} size='small' />
        </Segment>
    </div>

)
export default FirstPage;