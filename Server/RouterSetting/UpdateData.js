const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../DataBase/SqlQuerySettingUser');
const ch  =require('../DataBase/SqlQueryAutorizaition');
const ob = require('../ErrorObject/Errors');
const crypto = require('../EncodeDecodeFunc/Crypto');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/:id', (req, res, next) => {
    let data = req.body;
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

router.post("/:id", (req, res) => {
    let userId = req.params.id;
    let data = req.body;
    if(data.password.length !== 0) {
        let password = crypto.encodePassword(data.password);
        user.uploadDataUser(data, userId, password).then((result)=> {
            res.status(200).send("Successfully");
        }).catch((error) => {
            console.log(error);
            res.status(401).json({
                message: ob.objERRORS.USER_SIGNUP,
            });
        });
    } else {
        user.uploadData(data, userId).then((result)=> {
            res.status(200).send("Successfully");
        }).catch((error) => {
            console.log(error);
            res.status(401).json({
                message: ob.objERRORS.USER_SIGNUP,
            });
        });
    }

});

module.exports = router;