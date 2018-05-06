var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('../DataBase/SqlQueryAutorizaition');
var ob = require('../ErrorObject/Errors');
var crypto = require('../EncodeDecodeFunc/Crypto');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/', (req, res) => {
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