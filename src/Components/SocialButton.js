import React from 'react';
import { Button } from 'semantic-ui-react';
import './SocialButton.css';

const SocialButton = () => (
    <div className = 'ButtonForSignUp'>
            <Button circular color='facebook' icon='facebook' />
            <Button circular color='pink' icon='instagram' />
            <Button circular color='vk' icon='vk' />
    </div>
)

export default SocialButton;