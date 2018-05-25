const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../DataBase/SqlQueryAutorizaition');
const ob = require('../ErrorObject/Errors');
const crypto = require('../EncodeDecodeFunc/Crypto');
const jwt = require('jsonwebtoken');
const valid = require('../ErrorObject/ValidationError');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', valid.validationFieldLoginIn, (req, res) => {
    let data = req.body;
    user.loginUserIntoApp(data).then((result)=> {
        console.log(result);
        let passwordLogin = crypto.encodePassword(data.password);
        let passwordDataBase = result[0].passwordUsers;
        let password = crypto.decodePassword(passwordDataBase);
        let passworLoginDecode = crypto.decodePassword(passwordLogin);
        if (JSON.stringify(password.words) === JSON.stringify(passworLoginDecode.words)) {
            console.log(JSON.stringify(password.words) === JSON.stringify(passworLoginDecode.words));
            const payload = {
                email: result[0].emailUsers,
            };

            let token = jwt.sign(payload,'Secret',{ expiresIn: '1d' });
            res.status(201).json({
                message: "ok",
                email: result[0].emailUsers,
                firstName: result[0].firstNameUsers,
                lastName: result[0].lastNameUsers,
                token: token,
                idUsers: result[0].idUsers,
                urlImage: result[0].urlImage,
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