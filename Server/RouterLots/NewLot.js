var express = require('express');
var router = express.Router();
var user = require('../DataBase/SQLQueryForLot');
var ob = require('../ErrorObject/Errors');


router.get("/", function(req, res) {
    user.getCategory().then((result)=> {
            res.status(201).json({
                result: result,
            });
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            message: ob.objERRORS.USER_SIGNUP,
        });
    });
});



module.exports = router;