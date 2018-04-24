const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const CHANGE_LOCATION = 'CHANGE_LOCATION';

export function login(email, password) {
    return dispatch => {
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callLoginApi(email, password, error => {
            if (!error) {
                dispatch(setLoginSuccess(true));
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}

export function signup(email, password, confirmPassword, firstName, lastName) {
    return dispatch => {
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callSignupApi(email, password, confirmPassword, firstName, lastName, error => {
            if (!error) {
                dispatch(setLoginSuccess(true));
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}


function callSignupApi(email, password, confirmPassword, firstName, lastName, callback) {

    if (email.length === 0 && password.length === 0 && confirmPassword.length === 0 && firstName.length === 0 && lastName.length === 0) {
        return callback(new Error('Please fill in the fields'));
    } else {
        return callback(null);
    }
}

function callLoginApi(email, password, callback) {

        if (email.length === 0 && password.length === 0) {
            return callback(new Error('Invalid email and password'));
        } else {
            return callback(null);
        }
}

function setLoginSuccess(isLoginSuccess) {

    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

 export function changeLoginToSignUp(location) {
    return {
        type: CHANGE_LOCATION,
        location
    }
}

function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}

export default function reducer(state = {
    isLoginSuccess: false,
    location: 'LoginIn',
}, action) {
    switch (action.type) {

        case SET_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: action.isLoginSuccess
            });

        case SET_LOGIN_ERROR:
            return Object.assign({}, state, {
                loginError: action.loginError
            });

        case CHANGE_LOCATION:
            console.log({...state});
            return Object.assign({}, state, {
                location: action.location
            });

        default:
            return state;
    }
}