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

router.post('/', (req, res) => {
    let data = req.body;
    user.loginUserIntoApp(data).then((result)=> {
        let passwordLogin = crypto.encodePassword(data.password);
        let passwordDataBase = result[0].passwordUsers;
        let password = crypto.decodePassword(passwordDataBase);
        let passworLoginDecode = crypto.decodePassword(passwordLogin);
        if (JSON.stringify(password.words) === JSON.stringify(passworLoginDecode.words)) {
            res.status(201).json({
                message: "ok",
            });
        } else {
            res.status(409).json({
                message: ob.objERRORS.USER_LOGIN,
            });
        }
    }).catch((error) => {
        res.status(409).json({
            message: ob.objERRORS.USER_LOGIN,
        });
    });
});

module.exports = router;