var express = require('express');
var router = express.Router();
var user = require('../DataBase/SQLQueryForLot');
var ob = require('../ErrorObject/Errors');
var path = require('path');

const multer = require( "multer" );

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './ImageLot');
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

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

router.post("/", upload.any(), (req, res) => {

    let filesPath = [];
    for(let i = 0; i < req.files.length; i++){
        filesPath.push(req.files[i].path);
    }
        //let filePath = req.files ? req.files.path : null;
        let lotData = JSON.parse(req.body.lotData);
        user.setValueLot(lotData).then((result) => {
            user.setImage(filesPath, result.insertId).then((result) => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
                res.status(401).json({
                    message: ob.objERRORS.USER_SIGNUP,
                });
            });
        }).catch((error) => {
            console.log(error);
            res.status(401).json({
                message: ob.objERRORS.USER_SIGNUP,
            });
        });
});

module.exports = router;
