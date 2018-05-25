import React from 'react'
import { Message } from 'semantic-ui-react';

this.displayError = (error, message) => {

    let display =
        <Message negative>
            <Message.Header>{error}</Message.Header>
            <p>{message}</p>
        </Message>

    return display;
};

export const ErrorMessage = (error) => {

    switch(error){
        case 'ERROR_LIMIT_FILE': return (
            this.displayError('Limit file', 'Please, load no more than 5 files')
        );
        case 'ERROR_FORM_VALID': return (
            this.displayError('Validation error', 'Please, check you data in the input form')
        );
        case 'ERROR_EMPTY_FIELD': return (
            this.displayError('Validation error', 'Please, fill all field' )
        );
        case 'ERROR_PASSWORD_CONFIRM': return (
            this.displayError('Validation error', 'Please, check your password or confirm password' )
        );
        default:
            break;
    }

};
