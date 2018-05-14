const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_SIGN_UP_SUCCESS = 'SET_SIGN_UP_SUCCESS';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
const CHANGE_LOCATION = 'CHANGE_LOCATION';
const SET_LOGIN_VALUE = 'SET_LOGIN_VALUE';
const SET_URL_VALUE = 'SET_URL_VALUE';
const SET_LOT_VALUE = 'SET_LOT_VALUE';
const SET_CATEGORY_VALUE = 'SET_CATEGORY_VALUE';
const SET_LOTS_VALUES = 'SET_LOTS_VALUES';

export function login(email, password) {
    return dispatch => {
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callLoginApi(email, password, error => {
            if (!error) {
                dispatch(setLoginSuccess(true,email));
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}

export function signup(email, password, confirmPassword, firstName, lastName) {
    return dispatch => {
        dispatch(setSignUpSuccess(false, email));
        dispatch(setLoginError(null));

        callSignupApi(email, password, confirmPassword, firstName, lastName, error => {
            if (!error) {
                dispatch(setSignUpSuccess(true));
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}

export function loginValue(data) {
    return {
        type: SET_LOGIN_VALUE,
        data
    }
}

export function saveUserAvatar(urlImage) {
    return {
        type: SET_URL_VALUE,
        urlImage
    }
}

export function saveDataLot (lot) {
    return {
        type: SET_LOT_VALUE,
        lot
    }
}

export function saveAllDataLots (lots) {
    return {
        type: SET_LOTS_VALUES,
        lots
    }
}

function callSignupApi(email, password, confirmPassword, firstName, lastName, callback) {
    if (email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0 && firstName.length !== 0 && lastName.length !== 0) {
       if(password === confirmPassword)
        {
            return callback(null);
        } else {
           return callback(new Error('Wrong password and confirm password'));
       }
    } else {
        return callback(new Error('Please fill in the fields'));
    }
}

function callLoginApi(email, password, callback) {

        if (email.length === 0 && password.length === 0) {
            return callback(new Error('Invalid email and password'));
        } else {
            return callback(null);
        }
}

function setSignUpSuccess(isSignUpSuccess, email) {

    return {
        type: SET_SIGN_UP_SUCCESS,
        isSignUpSuccess,
        email
    };
}

function setLoginSuccess(isLoginSuccess, email) {

    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess,
        email
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
export function getValueCategory (category) {
    return {
        type: SET_CATEGORY_VALUE,
        category
    }
}

export default function reducer(state = {
    isLoginSuccess: false,
    isSignUpSuccess:false,
    location: 'LoginIn',
}, action) {
    switch (action.type) {

        case SET_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: action.isLoginSuccess,
                email:action.email,
            });

        case SET_SIGN_UP_SUCCESS:
            return Object.assign({}, state, {
                isSignUpSuccess: action.isSignUpSuccess,
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

        case SET_LOGIN_VALUE:
            return Object.assign({}, state, {
                data: action.data
            });

        case SET_URL_VALUE:
            return {...state, data: {...state.data,
                    urlImage: action.urlImage}};

        case SET_LOT_VALUE:
            return Object.assign({}, state, {
                lot: action.lot
            });

        case SET_CATEGORY_VALUE:
            return Object.assign({}, state, {
                category: action.category
            });

        case SET_LOTS_VALUES:
            return Object.assign({}, state, {
                lots: action.lots
            });

        default:
            return state;
    }
}