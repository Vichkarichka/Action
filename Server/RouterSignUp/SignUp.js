var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../DataBase/SqlQueryAutorizaition');
var ob = require('../ErrorObject/Errors');
var crypto = require('../EncodeDecodeFunc/Crypto');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', function(req, res, next) {
    var data = req.body;

    user.checkEmail(data).then(function(result) {
        if (result.length === 0) {
            return next();
        } else {
            res.status(409).json({
                message: ob.objERRORS.USER_SINGUP,
            });
        }
    }).catch(function(error) {
        res.status(404).json({
            message: ob.objERRORS.USER_SINGUP,
        });
    });
});

router.post('/', (req, res) => {
    let data = req.body;
    let password = crypto.encodePassword(data.password);
    user.pushRegistationDataToDatabase(data, password).then((result)=> {
        if (result.length !== 0) {
            res.status(201).send("Successfully");
        } else {
            res.status(409).json({
                message: ob.objERRORS.USER_SINGUP,
            });
        }
    }).catch((error) => {
        res.status(409).json({
            message: ob.objERRORS.USER_SINGUP,
        });
    });
});

module.exports = router;