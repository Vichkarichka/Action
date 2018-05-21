const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../DataBase/SqlQueryAutorizaition');
const ob = require('../ErrorObject/Errors');
const crypto = require('../EncodeDecodeFunc/Crypto');
const ch = require('../Middleware/CheckEmail');

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
                message: ob.objERRORS.USER_SIGNUP,
            });
        }
    }).catch((error) => {
        res.status(409).json({
            message: ob.objERRORS.USER_SIGNUP,
        });
    });
});

module.exports = router;