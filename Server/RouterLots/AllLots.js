var express = require('express');
var router = express.Router();
var user = require('../DataBase/SQLQueryForLot');
var ob = require('../ErrorObject/Errors');


router.get("/", function(req, res) {
    user.getAllLots().then(async(result)=> {
        const promise = [];
        const mas = [];
        for(let i = 0; i< result.length; i++) {

            promise.push(user.getLotsImage(result[i].idLot));
        }
        for await (const items of promise) {
            mas.push(items);
        }
        for(let i = 0; i < result.length; i++){
            if(mas[i].length === 0) continue;
            if(result[i].idLot === mas[i][0].idLot) {
                result[i].img = mas[i];
            }
        }
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