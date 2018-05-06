var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../DataBase/SqlQueryAutorizaition');
var ob = require('../ErrorObject/Errors');
var crypto = require('../EncodeDecodeFunc/Crypto');
var ch = require('../Middleware/CheckEmail');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/',ch.checkEmail, (req, res) => {
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