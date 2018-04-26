import React from 'react'
import { Segment, Image } from 'semantic-ui-react';
import logo from '../Style/logo.jpeg';
import { Link } from 'react-router-dom';


const Template = () => (
    <div>
        <Segment raised>
            <Link to='/'> <Image src= {logo} size='small' /></Link>
        </Segment>
    </div>

)

export default Template;