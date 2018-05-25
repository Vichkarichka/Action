let express = require('express');

let expressValidator = require('express-validator');
let bodyParser = require('body-parser');
const ob = require('../ErrorObject/Errors');

exports.validationFieldSignUp = (req, res, next) => {

    req.checkBody('email', ob.objERRORS.USER_EMAIL).notEmpty().isEmail();
    req.checkBody('password', ob.objERRORS.USER_PASSWORD).notEmpty()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    req.checkBody('firstName', ob.objERRORS.USER_FIRSTNAME).notEmpty().isAlpha();
    req.checkBody('lastName', ob.objERRORS.USER_LASTNAME).notEmpty().isAlpha();
    errors(req, res, next);
};

exports.validationFieldLoginIn = (req, res, next) => {

    req.checkBody('email', ob.objERRORS.USER_EMAIL).notEmpty().isEmail();
    req.checkBody('password', ob.objERRORS.USER_PASSWORD).notEmpty()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    errors(req, res, next);
};

exports.validationFieldSetting = (req, res, next) => {

    req.checkBody('email', ob.objERRORS.USER_EMAIL).notEmpty().isEmail();
    req.checkBody('password', ob.objERRORS.USER_PASSWORD).optional({ checkFalsy: true }).matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    req.checkBody('firstName', ob.objERRORS.USER_FIRSTNAME).notEmpty().isAlpha();
    req.checkBody('lastName', ob.objERRORS.USER_LASTNAME).notEmpty().isAlpha();
    errors(req, res, next);
};

exports.validationFieldNewLot = (req, res, next) => {

    for(let i = 0; i < req.body.length; i++)  {
        req.checkBody([i, 'nameLot'], ob.objERRORS.LOT_NAME).notEmpty().matches(/^([a-zA-Z0-9 .,_-]+)$/);
        req.checkBody([i, 'price'], ob.objERRORS.LOT_PRICE).notEmpty().matches(/^\d{1,8}(?:\.\d{1,4})?$/);
        req.checkBody([i, 'textField'], ob.objERRORS.LOT_DESCTRIPTION).optional({ checkFalsy: true }).matches(/^[\w ()+.'"?!:;,-]*$/);
        req.checkBody([i, 'value'], ob.objERRORS.LOT_SECTIONS).notEmpty().isNumber();
        req.checkBody([i, 'startTime'], ob.objERRORS.LOT_TIME).notEmpty().matches(/^([0-9]{4})-([0-1][0-9])-([0-3][0-9])( [0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/);
        req.checkBody([i, 'endTime'], ob.objERRORS.LOT_TIME).notEmpty().matches(/^([0-9]{4})-([0-1][0-9])-([0-3][0-9])( [0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/);
    }
    errors(req, res, next);
};


errors = (req, res, next) => {
    let errors = req.validationErrors();

    if (errors) {
        for (let i = 0; i < errors.length; i++) {
            res.status(400).json({
                message: errors[i].msg,
            });
            return;
        }
    } else {
        next();
    }
};