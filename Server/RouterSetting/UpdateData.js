var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../DataBase/SqlQuerySettingUser');
var ch  =require('../DataBase/SqlQueryAutorizaition');
var ob = require('../ErrorObject/Errors');
var crypto = require('../EncodeDecodeFunc/Crypto');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/:id', function(req, res, next) {
    var data = req.body;
    ch.checkEmail(data).then(function(result) {
        if (result.length === 0 || result[0].idUsers === parseInt(req.params.id)) {
            return next();
        } else {
            res.status(409).json({
                message: ob.objERRORS.USER_CREATE,
            });
        }
    }).catch(function(error) {
        res.status(404).json({
            message: ob.objERRORS.USER_INFO,
        });
    });
});

router.post("/:id", function(req, res) {
    let userId = req.params.id;
    let data = req.body;
    if(data.password.length !== 0) {
        let password = crypto.encodePassword(data.password);
        user.uploadDataUser(data, userId, password).then((result)=> {
            res.status(200).send("Successfully");
        }).catch((error) => {
            console.log(error);
            res.status(401).json({
                message: ob.objERRORS.USER_SINGUP,
            });
        });
    } else {
        user.uploadData(data, userId).then((result)=> {
            res.status(200).send("Successfully");
        }).catch((error) => {
            console.log(error);
            res.status(401).json({
                message: ob.objERRORS.USER_SINGUP,
            });
        });
    }

});

module.exports = router;