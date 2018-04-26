import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import ModalLoginInForm from './ModalLoginInForm';
import logo from '../Style/logo.jpeg';
import { Link } from 'react-router-dom';

const FirstPage = () => (
    <div>
        <ModalLoginInForm/>
        <Segment raised>
            <Link to='/' > <Image src= {logo} size='small' /></Link>
        </Segment>
    </div>
);
export default FirstPage;